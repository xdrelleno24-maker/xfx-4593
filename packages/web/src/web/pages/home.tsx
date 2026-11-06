import { useState, type FormEvent } from "react";
import { Image as ImageIcon, ArrowUpRight, Copy, Check } from "lucide-react";

const types = [
  { name: "Bust", description: "Head and shoulders.", shape: "bust" },
  { name: "Half-body", description: "Your character from the waist up.", shape: "half" },
  { name: "Full-body", description: "Your character’s full design and pose.", shape: "full" },
  { name: "Comic", description: "A short sequence of panels telling your story.", shape: "comic" },
  {
    name: "Illustration",
    description: "A scene with your characters, a setting, and a mood.",
    shape: "illustration",
  },
];

function ArtSlot({ label, banner = false }: { label: string; banner?: boolean }) {
  return (
    <div className={banner ? "art-slot banner" : "art-slot"}>
      <ImageIcon size={banner ? 32 : 24} strokeWidth={1} />
      <span>{label}</span>
    </div>
  );
}

export default function Home() {
  const [service, setService] = useState("Bust");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  function prepareRequest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setMessage(
      `Hi TheKaori02! I’d like to request a commission.\n\nName / handle: ${data.get("name")}\nType: ${service}\nIdea: ${data.get("description")}\nReferences: ${data.get("references") || "I’ll send these by DM."}\n\nCould you let me know your availability, price, and terms? Thank you!`,
    );
    setCopied(false);
    setCopyError(false);
  }
  async function copyRequest() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <main className="comms-page" id="top">
      <header>
        <ArtSlot label="banner artwork goes here" banner />
        <h1>TheKaori02’s art comms</h1>
        <p className="status">
          Status: <span>to be announced</span>
        </p>
        <div className="hello">
          <h2>Hello!</h2>
          <p>I’m Kaori. Here you can find the info about my art commissions.</p>
          <p>If you have a question or want to commission me, send me a DM!</p>
          <a href="https://x.com/thekaori02" target="_blank" rel="noreferrer">
            @thekaori02 <ArrowUpRight size={15} />
          </a>
        </div>
        <nav aria-label="Main navigation">
          <a href="#gallery">gallery</a>
          <span>/</span>
          <a href="#pricing">prices</a>
          <span>/</span>
          <a href="#terms">terms</a>
          <span>/</span>
          <a href="#request">request</a>
        </nav>
      </header>

      <section id="gallery">
        <h2>ART GALLERY</h2>
        <p className="section-note">I’ll add my artwork here soon.</p>
        <div className="gallery-grid">
          {Array.from({ length: 6 }, (_, i) => (
            <figure key={i}>
              <ArtSlot label="your artwork here" />
              <figcaption>work {String(i + 1).padStart(2, "0")}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="pricing">
        <h2>TYPES & PRICES</h2>
        <p className="section-note">
          All prices are in USD. Full-body, Comic, and Illustration start at $50. The final price
          may be higher depending on complexity.
        </p>
        <p className="section-note">
          Additional characters may increase the price. Let me know how many characters you want
          — I’ll confirm the final quote before we start.
        </p>
        {types
          .filter((type) => type.name !== "Illustration")
          .map((type) => (
            <article className={`commission-type ${type.shape}`} key={type.name}>
              <h3>{type.name === "Full-body" ? "Full-body & Illustration" : type.name}</h3>
              <p className="price">
                {["Full-body", "Comic", "Illustration"].includes(type.name)
                  ? "from $50 USD"
                  : type.name === "Bust"
                    ? "$30 USD"
                    : "$40 USD"}
              </p>
              {type.name === "Full-body" ? (
                <div className="type-description">
                  <p>
                    <strong>Full-body:</strong> a character-focused piece showing the full design
                    and pose.
                  </p>
                  <p>
                    <strong>Illustration:</strong> character art with a background, setting, and
                    extra scene details.
                  </p>
                  <p>
                    Both start at $50 USD. Tell me what you have in mind — the final price depends
                    on complexity.
                  </p>
                </div>
              ) : (
                <p>{type.description}</p>
              )}
              <div className="examples">
                {type.name === "Full-body" ? (
                  <>
                    <figure>
                      <a
                        href="/images/illustration-01.jpg"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="View illustration example at full size"
                      >
                        <img
                          src="/images/illustration-01.jpg"
                          alt="Illustration by TheKaori02: a cloaked character on a staircase"
                          width={1360}
                          height={2040}
                          loading="lazy"
                        />
                      </a>
                      <figcaption>with a background</figcaption>
                    </figure>
                    <figure>
                      <a
                        href="/images/illustration-02.jpg"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="View character art example at full size"
                      >
                        <img
                          src="/images/illustration-02.jpg"
                          alt="Character art by TheKaori02: Super Saiyan Goku in an action pose"
                          width={1437}
                          height={2167}
                          loading="lazy"
                        />
                      </a>
                      <figcaption>character-focused</figcaption>
                    </figure>
                  </>
                ) : type.name === "Comic" ? (
                  <>
                    <a
                      href="/images/comic-01.jpg"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="View comic example 1 at full size"
                    >
                      <img
                        src="/images/comic-01.jpg"
                        alt="Comic by TheKaori02: Return by Dead, an SCP scene"
                        loading="lazy"
                        width={1536}
                        height={2048}
                      />
                    </a>
                    <a
                      href="/images/comic-02.jpg"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="View comic example 2 at full size"
                    >
                      <img
                        src="/images/comic-02.jpg"
                        alt="Comic by TheKaori02: a conversation between Subaru and Ram"
                        loading="lazy"
                        width={2894}
                        height={4093}
                      />
                    </a>
                  </>
                ) : (
                  <>
                    <ArtSlot label="example 01" />
                    <ArtSlot label="example 02" />
                  </>
                )}
              </div>
              <a className="request-type" href="#request" onClick={() => setService(type.name)}>
                request {type.name === "Illustration" ? "an" : "a"} {type.name.toLowerCase()} ↗
              </a>
              {type.name === "Full-body" && (
                <>
                  <span className="request-divider"> / </span>
                  <a
                    className="request-type"
                    href="#request"
                    onClick={() => setService("Illustration")}
                  >
                    request an illustration ↗
                  </a>
                </>
              )}
            </article>
          ))}
        <p className="custom-note">
          Looking for something else?{" "}
          <a href="#request" onClick={() => setService("Custom idea")}>
            Tell me your idea.
          </a>
        </p>
      </section>

      <section id="terms">
        <h2>GENERAL TERMS</h2>
        <p className="section-note">
          Still being put together. Please check with me before ordering.
        </p>
        <ul className="terms-list">
          <li>
            <strong>Payment & refunds:</strong> methods, deposits, and refund rules will be
            confirmed before you order.
          </li>
          <li>
            <strong>Artwork usage:</strong> ask me about personal or commercial use before we start.
          </li>
          <li>
            <strong>Revisions:</strong> the number of changes included will be agreed on before
            starting.
          </li>
          <li>
            <strong>Delivery time:</strong> ask me for an estimate when you send your request.
          </li>
        </ul>
      </section>

      <section id="process">
        <h2>PROCESS</h2>
        <p className="section-note">A draft of how it’ll work. We’ll confirm the details by DM.</p>
        <ol className="process-list">
          <li>You send your idea + character references.</li>
          <li>We agree on the price, terms, and timeline.</li>
          <li>I work on the sketch and check it with you.</li>
          <li>I finish the artwork and send it to you.</li>
        </ol>
      </section>

      <section id="request">
        <h2>WANT A COMMISSION?</h2>
        <p>You can DM me directly, or fill this out to put your request together.</p>
        <div className="socials">
          <a href="https://www.instagram.com/thekaori02/" target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
          <span>/</span>
          <a href="https://x.com/thekaori02" target="_blank" rel="noreferrer">
            X / Twitter ↗
          </a>
        </div>
        <p className="handle">@thekaori02 on all my socials</p>
        <form onSubmit={prepareRequest}>
          <label>
            Your name / handle
            <input
              aria-label="Your name / handle"
              name="name"
              placeholder="@yourname"
              required
              maxLength={120}
            />
          </label>
          <label>
            Commission type
            <select
              aria-label="Commission type"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              {[...types.map((type) => type.name), "Custom idea"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            Your idea
            <textarea
              aria-label="Your idea"
              name="description"
              rows={4}
              placeholder="Tell me what you’d like me to draw…"
              required
              maxLength={5000}
            />
          </label>
          <label>
            Reference links (optional)
            <input
              aria-label="Reference links"
              name="references"
              placeholder="Links to your character / references"
              maxLength={2000}
            />
          </label>
          <button className="prepare" type="submit">
            prepare my message ↗
          </button>
          <p className="form-note">
            This doesn’t send anything. Copy your message and send it to me by DM.
          </p>
          {message && (
            <div className="request-result" aria-live="polite">
              <h3>Your message:</h3>
              <textarea
                aria-label="Prepared commission message"
                readOnly
                value={message}
                rows={9}
              />
              <button type="button" onClick={copyRequest}>
                {copied ? <Check size={16} /> : <Copy size={16} />}{" "}
                {copied ? "copied!" : "copy message"}
              </button>
              {copyError && <p>Please select and copy the message manually.</p>}
              <a href="https://www.instagram.com/thekaori02/" target="_blank" rel="noreferrer">
                open Instagram ↗
              </a>
            </div>
          )}
        </form>
      </section>
      <footer>
        <p>Thanks for stopping by!</p>
        <a href="#top">↑ back to top</a>
        <small>© {new Date().getFullYear()} TheKaori02</small>
      </footer>
    </main>
  );
}
