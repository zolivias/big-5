import type { Metadata } from "next";
import { researchSources } from "../../lib/evidence";
import { InfoHero, PageShell } from "../components/Shell";

export const metadata: Metadata = { title: "Evidence Library", description: "The research behind Path Five activities, including what each paper does and does not support." };

export default function EvidencePage() {
  return <PageShell>
    <InfoHero eyebrow="Evidence Library" title="See what supports each activity." intro="Every activity in Your Toolkit links to research. Path Five separates direct evidence from promising findings and broader contextual research." />
    <section className="evidence-method">
      <article><strong>Strong</strong><h2>Direct research or reviews</h2><p>The core method is supported by experiments, randomized studies, systematic reviews, or meta-analyses.</p></article>
      <article><strong>Promising</strong><h2>Relevant findings with limits</h2><p>The research is related, but the sample, setting, dose, or exact Path Five format differs.</p></article>
      <article><strong>Contextual</strong><h2>Theory or observational evidence</h2><p>The source supports the rationale or association, but does not prove the activity causes the stated outcome.</p></article>
    </section>
    <section className="research-library">
      <div className="section-heading"><p className="section-kicker">Reviewed sources</p><h2>The papers behind the toolkit</h2><p>Each entry includes verified authors and an original plain-language summary, followed by a link to the published source.</p></div>
      <div className="research-list">{Object.entries(researchSources).map(([id, source], index) => <article id={id} key={id}><span>{String(index + 1).padStart(2,"0")}</span><div><p className="research-citation">{source.citation}</p><h3>{source.title}</h3><p className="research-authors">{source.authors}</p><p className="research-publication">{source.publication}</p><div className="plain-abstract"><strong>Plain-Language Abstract</strong><p>{source.plainLanguageAbstract}</p></div><a className="text-link" href={source.url} target="_blank" rel="noreferrer">Open the Original Paper ↗</a></div></article>)}</div>
    </section>
    <section className="soft-note"><h2>Evidence does not guarantee a result.</h2><p>Research describes average findings in particular samples. An activity may help, do nothing, or feel unhelpful for an individual. Path Five uses your preferences and feedback to adjust what appears next.</p></section>
  </PageShell>;
}
