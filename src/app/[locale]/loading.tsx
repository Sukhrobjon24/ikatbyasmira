export default function LocaleLoading() {
  return (
    <section className="section page-intro">
      <div className="container loading-shell" aria-label="Loading content">
        <div className="loading-copy">
          <span className="loading-kicker" />
          <span className="loading-title" />
          <span className="loading-line" />
          <span className="loading-line loading-line--short" />
        </div>
        <div className="loading-grid">
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}
