interface Props {
  url: string;
}

function Snapshot({ url }: Props) {
  return (
    <div className="card snapshot">
      <p className="snapshot__label">Snapshot</p>
      <img src={url} alt="Captured snapshot" className="snapshot__img" />
    </div>
  );
}

export default Snapshot;
