import { Link, Navigate, useParams } from 'react-router-dom'
import { useTitle } from '../components/page'
import { Chevron, Eyebrow, Reveal } from '../components/ui'
import { NEWS_CATEGORIES, formatNewsDate, readingTime } from '../data/news'
import { LINKS } from '../data/site'
import { useNews } from '../lib/content'
import { StoryCard } from './NewsPage'

/** One story, read in a narrow column, with the next few underneath. An unknown slug goes back to the list. */
export default function NewsArticle() {
  const { slug } = useParams()
  const news = useNews()
  const story = news?.find((s) => s.slug === slug)
  useTitle(story?.title ?? 'News')

  if (!news) return <div className="page wrap" aria-busy="true" />
  if (!story) return <Navigate to={LINKS.news} replace />

  const more = news.filter((s) => s.slug !== story.slug).slice(0, 3)

  return (
    <div className="page wrap">
      <article className="article">
        <Link to={LINKS.news} className="back">
          <Chevron dir="left" /> All news
        </Link>
        <Eyebrow>
          <span className="hl">{NEWS_CATEGORIES[story.category]?.label}</span> · <time dateTime={story.date}>{formatNewsDate(story.date)}</time> ·{' '}
          {readingTime(story)} min read
        </Eyebrow>
        <h1 className="display display--sm article__title">{story.title}</h1>
        <p className="lead">{story.excerpt}</p>
        <div className="media article__photo">
          <img src={story.image} width={story.width} height={story.height} alt={story.alt} />
        </div>
        <div className="article__body">
          {story.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </article>

      {more.length > 0 && (
        <section className="page__section" aria-labelledby="more-news">
          <h2 id="more-news" className="display display--sm">
            More news<span className="hl">.</span>
          </h2>
          <ul className="stories">
            {more.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 70}>
                <StoryCard story={s} />
              </Reveal>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
