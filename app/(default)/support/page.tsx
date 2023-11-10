export const metadata = {
  title: "Support | QuickWires",
  description: "QuickWires Support",
};

export default function support() {
  return (
    <>
      <section>
        <div
          className={`max-w-6xl mx-auto px-4 sm:px-6 md:pb-16 pb-10 pt-24 md:pt-24`}
        >
          <div className="max-w-3xl pb-12">
            <h1 className="h1 mb-4" data-aos="fade-up">
              Support
            </h1>
          </div>

          <div className="flex flex-col text-lg">
            <p>
              For all support requests, please email{" "}
              <a
                className="text-lg"
                target="_blank"
                href="mailto:support@quickwires.io"
              >
                support@quickwires.io
              </a>
            </p>
            <p>
              Emails sent from an address associated with an active QuickWires
              Pro account will get priority response times.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
