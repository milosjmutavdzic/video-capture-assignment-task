interface Props {
  onStart: () => void
  disabled: boolean
}

function Instructions({ onStart, disabled }: Props) {
  return (
    <section className="instructions card">
      <h1 className="instructions__title">Video capture</h1>
      <p className="instructions__description">
        Click the button to allow camera access. A photo will be taken
        automatically after a few seconds.
      </p>
      <button className="btn-primary" onClick={onStart} disabled={disabled}>
        Start
      </button>
    </section>
  )
}

export default Instructions
