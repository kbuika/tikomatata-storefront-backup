import SEO from "@/components/seo"
import DefaultLayout from "@/layouts/default-layout"
export default function Contact() {
  return (
    <DefaultLayout>
      <SEO title={"Contact Us"} description="Let's go on a date -- bill's on us" />
      <section className=" min-h-screen pt-[50px]">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">
            Contact Us
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Got a technical issue? Want to send feedback about an event? Need help purchasing a
            ticket? Want to sell tickets to an event? Let us know.
          </p>
          <ul className="flex flex-col items-center justify-center">
            <li className="mb-8 flex flex-col items-center justify-center">
              <h3 className="mb-4 text-xl tracking-tight font-extrabold text-white">Email</h3>
              <p className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:text-xl text-center">
                Send us an email at{" "}
                <a
                  href="mailto:info@tikomatata.com"
                  className="text-white underline underline-offset-2"
                >
                  support@tikomatata.com
                </a>
              </p>
            </li>
            <li className="mb-8 flex flex-col items-center justify-center">
              <h3 className="mb-4 text-xl tracking-tight font-extrabold text-white">Phone</h3>
              <p className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:text-xl">
                Call us at{" "}
                <a href="phone:+254740459940" className="text-white underline underline-offset-2">
                  0740459940
                </a>
              </p>
            </li>
          </ul>
        </div>
      </section>
    </DefaultLayout>
  )
}
