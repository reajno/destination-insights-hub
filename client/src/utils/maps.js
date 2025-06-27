// Month labels used in charts (ensure keys are all strings for consistency)
export const monthMap = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

// Local Government Areas (LGAs) and their associated themes and labels
export const lgaMap = {
  "Gold Coast": {
    theme: "bg-yellow-50",
    label: "🏖️ Gold Coast",
  },
  Cairns: {
    theme: "bg-green-50",
    label: "🌴 Cairns",
  },
  Noosa: {
    theme: "bg-blue-50",
    label: "🌊 Noosa",
  },
  Whitsundays: {
    theme: "bg-indigo-50",
    label: "⛵ Whitsundays",
  },
};

export const databaseMap = {
  Spend: {
    name: "spend_data",
    headers: ["date", "lga_name", "spend", "cards_seen", "no_txns", "category"],
  },
  "Historical Occupancy": {
    name: "occupancy_data",
    headers: [
      "date",
      "lga_name",
      "average_historical_occupancy",
      "average_daily_rate",
    ],
  },
  "Length of Stay": {
    name: "alos_data",
    headers: [
      "date",
      "lga_name",
      "average_length_of_stay",
      "average_booking_window",
    ],
  },
};

export const yearMap = [2023, 2024];
