const SimpleChart = ({ orders = [] }) => {
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString("en-GB");
  });

  const data = last7Days.map((day) => {
    const total = orders
      .filter((o) =>
        new Date(o.createdAt).toLocaleDateString("en-GB") === day
      )
      .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

    return { day, total };
  });

  const max = Math.max(...data.map((d) => d.total), 1);

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
      {data.map((d) => (
        <div key={d.day} style={{ textAlign: "center" }}>
          <div
            style={{
              width: 25,
              height: `${(d.total / max) * 200}px`,
              background: "royalblue",
              borderRadius: 5,
            }}
          />
          <small>{d.day}</small>
        </div>
      ))}
    </div>
  );
};

export default SimpleChart;