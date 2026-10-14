import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHead, useTitle } from '../components/page'
import { ArrowLink, ArrowLong, Reveal } from '../components/ui'
import { NEWS_CATEGORIES, NEWS_FILTERS, formatNewsDate } from '../data/news'
import type { NewsCategory, NewsStory } from '../data/news'
import { LINKS } from '../data/site'
import { useNews } from '../lib/content'

/** A story as a card: its picture, what kind of news it is, the title and a line of it. The first on a page is laid out large. */
export function StoryCard({ story, lead = false }: { story: NewsStory; lead?: boolean }) {
  return (
    <article className={`story${lead ? ' story--lead' : ''}`}>
      <div className="media story__photo">
        <img src={story.image} width={story.width} height={story.height} alt={story.alt} loading={lead ? undefined : 'lazy'} />
      </div>
      <div className="story__text">
        <p className="eyebrow">
          <span className="hl">{NEWS_CATEGORIES[story.category]?.label}</span> · <time dateTime={story.date}>{formatNewsDate(story.date)}</time>
        </p>
        <h2 className="title">
          <Link to={`${LINKS.news}/${story.slug}`} className="story__link">
            {story.title}
          </Link>
        </h2>
        <span className="dash" aria-hidden />
        <p>{story.excerpt}</p>
        <span className="story__more" aria-hidden>
          Read more <ArrowLong />
        </span>
      </div>
    </article>
  )
}

/** News: the newest story leads on its own row, the rest fall into a grid. Filtering keeps that shape. */
export default function NewsPage() {
  useTitle('News')
  const [filter, setFilter] = useState<NewsCategory | 'all'>('all')
  const news = useNews()

  const visible = useMemo(() => (news ?? []).filter((s) => filter === 'all' || s.category === filter), [news, filter])
  const [lead, ...rest] = visible

  return (
    <div className="page wrap">
      <PageHead eyebrow="News" lines={['Our kind of', 'moments.']}>
        <p>Dates for the diary, notes from the classroom, and the small wins worth telling everyone about.</p>
      </PageHead>

      <div className="chips" role="group" aria-label="Filter news">
        {NEWS_FILTERS.map((f) => (
          <button key={f.id} type="button" className="chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      {lead && (
        <Reveal key={lead.slug}>
          <StoryCard story={lead} lead />
        </Reveal>
      )}
      {rest.length > 0 && (
        <ul className="stories">
          {rest.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 3) * 70}>
              <StoryCard story={s} />
            </Reveal>
          ))}
        </ul>
      )}
      {news && visible.length === 0 && (
        <div className="card empty">
          <p className="title">Nothing here just yet.</p>
          <p>There is no news of this kind at the moment. Try another filter.</p>
        </div>
      )}

      <Reveal className="closing">
        <h2 className="display display--sm">
          Come and see for yourself<span className="hl">.</span>
        </h2>
        <p>The best way to know a school is to spend a morning in it. Visits run on weekdays while classes are in session.</p>
        <ArrowLink to={LINKS.visit}>Plan a Visit</ArrowLink>
      </Reveal>
    </div>
  )
}
