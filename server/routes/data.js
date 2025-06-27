import { Router } from "express";
import { supabase } from "../supabaseClient.js";

// Turned off for dev purposes (🔐 = Auth will be required)
import requireAuth from "../middleware/requireAuth.js";

const data = Router();

// All spend data (unchanged)
data.get("/spend", async (req, res) => {
  try {
    const { data: spend_data, error } = await supabase
      .from("spend_data")
      .select("*");

    if (error || spend_data.length === 0) throw error;
    res.json(spend_data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch spend data" });
  }
});

// 🔐 Monthly Spend Trends + Year Total
data.get("/spend/:region/:year", requireAuth, async (req, res) => {
  const { region, year } = req.params;

  try {
    const { data, error } = await supabase.rpc(
      "get_year_spend_metrics_by_region",
      {
        region: `%${region}%`,
        year: parseInt(year),
      }
    );

    if (error || data.length === 0) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch regional spend data" });
  }
});

// 🔐 Monzthly Occupancy Trends
data.get("/occupancy/:region/:year", requireAuth, async (req, res) => {
  const { region, year } = req.params;

  try {
    const { data, error } = await supabase.rpc(
      "get_year_occupancy_metrics_by_region",
      {
        region: `%${region}%`,
        year: parseInt(year),
      }
    );

    if (error || data.length === 0) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch regional spend data" });
  }
});

// 🔐 Monthly ALOS Trends
data.get("/alos/:region/:year", requireAuth, async (req, res) => {
  const { region, year } = req.params;

  try {
    const { data, error } = await supabase.rpc(
      "get_year_alos_metrics_by_region",
      {
        region: `%${region}%`,
        year: parseInt(year),
      }
    );

    if (error || data.length === 0) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch regional spend data" });
  }
});

// Spend Breakdown by Category
data.get("/spend-breakdown/:region/:year", async (req, res) => {
  const { region, year } = req.params;

  try {
    const { data, error } = await supabase.rpc("get_year_spend_by_category", {
      region: `%${region}%`,
      year: parseInt(year),
    });

    if (error || data.length === 0) throw error;

    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch regional spend breakdown data" });
  }
});

// 2-week summary for a region based on start date
data.get("/summary/:region", async (req, res) => {
  const { region } = req.params;
  const { start } = req.query;

  try {
    const { data, error } = await supabase
      .rpc("get_fortnight_summary", {
        region: `%${region}%`,
        start_date: start ? new Date(start) : null,
      })
      .limit(14);
    if (error || data.length === 0) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch summary data" });
  }
});

// Metrics average from latest 7 data points (occupancy, adr, alos, spend)
data.get("/metrics/:region", async (req, res) => {
  const region = req.params.region;

  try {
    const [
      { data: spendData, error: spendError },
      { data: occupancyData, error: occupancyError },
      { data: alosData, error: alosError },
    ] = await Promise.all([
      supabase
        .from("spend_data")
        .select("spend")
        .ilike("lga_name", `%${region}%`)
        .order("date", { ascending: false })
        .limit(7),
      supabase
        .from("occupancy_data")
        .select("average_historical_occupancy, average_daily_rate")
        .ilike("lga_name", `%${region}%`)
        .order("date", { ascending: false })
        .limit(7),
      supabase
        .from("alos_data")
        .select("average_length_of_stay")
        .ilike("lga_name", `%${region}%`)
        .order("date", { ascending: false })
        .limit(7),
    ]);

    if (spendError || occupancyError || alosError) {
      throw spendError || occupancyError || alosError;
    }

    const spend = spendData.reduce(
      (sum, row) => sum + parseFloat(row.spend || 0),
      0
    );

    const occupancy =
      occupancyData.reduce(
        (sum, row) => sum + parseFloat(row.average_historical_occupancy || 0),
        0
      ) / occupancyData.length;

    const adr =
      occupancyData.reduce(
        (sum, row) => sum + parseFloat(row.average_daily_rate || 0),
        0
      ) / occupancyData.length;

    const alos =
      alosData.reduce(
        (sum, row) => sum + parseFloat(row.average_length_of_stay || 0),
        0
      ) / alosData.length;

    res.json([
      {
        spend: spend.toFixed(0),
        occupancy: occupancy.toFixed(1),
        adr: adr.toFixed(2),
        alos: alos.toFixed(2),
      },
    ]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch metrics summary data" });
  }
});

export default data;
