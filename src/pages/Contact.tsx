import EnquiryForm from '../components/EnquiryForm'
import { CONTACT_FIELDS } from '../components/forms'
import { ContactCard, PageHead, useTitle } from '../components/page'
import { Reveal } from '../components/ui'
import { PHONE, PHONE_HREF } from '../data/site'

export default function Contact() {
  useTitle('Contact Us')
  return (
    <div className="page wrap">
      <PageHead eyebrow="Get in touch" lines={['Contact us.']}>
        <p>
          The only way to fully appreciate what Paradise offers is to see it for yourself. Our principal and coordinators would be delighted to give
          you and your family a personal tour of the school, introduce you to the teachers, and answer every question you have as you make this
          important decision for your family.
        </p>
      </PageHead>

      <div className="split">
        <Reveal className="split__aside">
          <ContactCard note="Call, write or message us and we will find a time for your visit." whatsappMessage="Hi, I'd like to plan a visit to Paradise Junior School." />
        </Reveal>
        <Reveal className="card split__main" delay={100}>
          <h2 className="title">Send us a message</h2>
          <EnquiryForm
            kind="contact"
            id="c"
            fields={CONTACT_FIELDS}
            success={() => (
              <>
                <h3 className="title">Thank you</h3>
                <p>
                  Your message is with the office. Someone will be in touch within one working day. If it is urgent, call us on{' '}
                  <a href={PHONE_HREF} className="text-link">
                    {PHONE}
                  </a>
                  .
                </p>
              </>
            )}
          />
        </Reveal>
      </div>
    </div>
  )
}
