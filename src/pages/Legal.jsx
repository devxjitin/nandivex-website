import { site } from '../data/site.js';
import { PageHeader, useMeta } from '../components/ui.jsx';

function Doc({ title, intro, sections }) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title}>{intro}</PageHeader>
      <section className="border-b border-line">
        <div className="wrap max-w-3xl py-14">
          {sections.map(([h, p]) => (
            <div key={h} className="mb-10">
              <h2 className="text-2xl">{h}</h2>
              <p className="mt-3 leading-relaxed text-muted">{p}</p>
            </div>
          ))}
          <p className="text-sm text-muted">
            Questions: <a className="text-accent underline" href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </section>
    </>
  );
}

export function Privacy() {
  useMeta('Privacy policy');
  return (
    <Doc
      title="Privacy policy"
      intro="How NANDIVEX handles information you share with us."
      sections={[
        ['What we collect', 'Only what you send us: the name, email, company and message you enter in our contact form or email to us.'],
        ['How we use it', 'To reply to your enquiry, prepare proposals and provide services you request. We do not sell your information.'],
        ['Sharing', 'We share information only with providers that help us run our business (for example email), or when the law requires it.'],
        ['Retention and your rights', 'We keep enquiry details only as long as needed for the purpose above. You can ask us to access, correct or delete your information at any time.'],
      ]}
    />
  );
}

export function Terms() {
  useMeta('Terms and conditions');
  return (
    <Doc
      title="Terms and conditions"
      intro="The terms for using this website and engaging NANDIVEX."
      sections={[
        ['Website use', 'The content on this site is for general information. You may not copy, scrape or misuse it.'],
        ['Services', 'Services are delivered under a written proposal or agreement that sets out scope, timeline, fees and responsibilities.'],
        ['Security testing', 'We run security assessments only against systems you own or are authorised to test, within agreed rules of engagement.'],
        ['Liability', 'This website is provided as is. Liability for delivered services is defined in the applicable service agreement.'],
      ]}
    />
  );
}
