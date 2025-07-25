export default function handler(req, res) {
  res.status(200).json([
    {
      airline: "LATAM",
      price: 510,
      departure: "2025-12-20",
      return: "2026-01-04",
      link: "https://example.com/deal1"
    },
    {
      airline: "American Airlines",
      price: 690,
      departure: "2025-12-21",
      return: "2026-01-03",
      link: "https://example.com/deal2"
    }
  ]);
}
