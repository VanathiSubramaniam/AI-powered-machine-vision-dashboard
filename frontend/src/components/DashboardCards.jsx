function DashboardCards({ data }) {
  return (
    <div className="cards">

      <div className="card">
        <h2>Running</h2>
        <div className="number">{data.running}</div>
      </div>

      <div className="card">
        <h2>Stopped</h2>
        <div className="number">{data.stopped}</div>
      </div>

      <div className="card">
        <h2>Production</h2>
        <div className="number">{data.production}</div>
      </div>

      <div className="card">
        <h2>Bottleneck</h2>
        <div className="number">{data.bottleneck}</div>
      </div>

    </div>
  );
}

export default DashboardCards;