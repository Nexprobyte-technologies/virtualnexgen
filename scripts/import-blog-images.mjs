import { readdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const root = process.cwd();
const imageDirectory = path.join(root, "public", "Blog Images");
const blogFile = path.join(root, "data", "blog.json");
const fullBlogFile = path.join(root, "data", "blogs_full.json");
const summaryBlogFile = path.join(root, "data", "blogs_data.json");
const duplicatePostId = "b010461b-d2d6-4b05-8d74-d244f3241030";
const supportedExtensions = new Set([".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const primaryImageOverrides = new Map([
  ["restoration-virtual-assistant-labor-crisis-2026", "45422.png"],
  ["commercial-real-estate-lease-abstracting-virtual-assistant", "38397.png"],
  ["e-commerce-amazon-seller-va-2026-playbook", "35653.png"],
  ["ai-automation-virtual-assistant-break-the-plateau", "82333.png"],
  ["hvac-instant-scheduling-dispatch-system", "19168.png"],
  ["insurance-renewals-processing-virtual-assistants-guide", "54070.png"],
  ["Boost-Law-Firm-Efficiency-with-Virtual-Assistant-Services", "85813.png"],
  ["trucking-dispatch-virtual-assistant-system", "23966.png"],
]);
const contentImageOverrides = new Map([["product-unknow.jpg", "35653.png"]]);
const remoteBlogImagePattern =
  /https:\/\/virtualnexgen\.com\/assets\/uploads\/blog\/([A-Za-z0-9._-]+)/g;
const additionalPost = {
  id: "f7d5e3b6-4a2c-4f91-b8d7-2e6a9c135048",
  slug: "trucking-dispatch-virtual-assistant-load-driver-support",
  title: "Trucking Dispatch Virtual Assistant: A Practical System for Loads, Drivers, and Documentation",
  excerpt:
    "A dedicated trucking dispatch virtual assistant organizes broker calls, driver updates, load records, and documentation so dispatch teams can act faster and keep loads moving.",
  filename: "41871.webp",
  contentHtml: `<p>Dispatch work rarely fails because a team lacks capable people. It fails because important details arrive through too many channels, arrive late, or remain visible to only one dispatcher. A load starts as a broker call, continues through a chain of messages, and ends with rate confirmation, documents, proof of delivery, and invoicing. If that information is scattered across inboxes, texts, notebooks, and portals, the dispatch team spends valuable time searching instead of making decisions.</p>

<p>A trucking dispatch virtual assistant provides a structured support layer around that work. The assistant can maintain a consistent load record, coordinate driver and broker communication, track missing documents, and keep the next action visible. This gives dispatchers more time for carrier relationships, problem solving, and profitable load decisions while helping drivers receive clear information without waiting for repeated follow-up.</p>

<h2>Why Dispatch Administration Becomes a Bottleneck</h2>

<p>A busy dispatch operation receives requests at the same time that drivers need updates, brokers need documents, and managers need a clear view of the board. Without an owner for the administrative details, the dispatcher becomes the owner of everything. Small delays then combine into larger problems: a driver waits for paperwork, a broker cannot confirm coverage, a rate detail is missed, and the next load is delayed.</p>

<p>The recurring pressure usually comes from three areas:</p>

<ul>
  <li><strong>Load visibility:</strong> important status changes are communicated verbally or inside separate message threads.</li>
  <li><strong>Driver communication:</strong> repeated questions consume time even when the answer is simple.</li>
  <li><strong>Document control:</strong> rates, confirmations, bills of lading, proofs of delivery, and invoices are easy to overlook.</li>
</ul>

<h2>Build One Operating Rhythm for Every Load</h2>

<p>A dependable workflow does not require complicated software. It requires the same sequence for every load and a clear owner for each step. A dispatch virtual assistant can help establish this sequence:</p>

<ol>
  <li>Record the load details, broker requirements, equipment type, timing, and rate information.</li>
  <li>Confirm coverage with the driver and send one complete reference sheet.</li>
  <li>Track milestones such as assignment, pickup, arrival, loading, delivery, and proof of delivery.</li>
  <li>Flag missing documents before they become delays.</li>
  <li>Close the load with an organized record that supports billing and future rate analysis.</li>
</ol>

<p>When each load follows the same rhythm, dispatchers can scan the board more quickly. They can see which loads are covered, which documents are outstanding, which drivers need follow-up, and which opportunities require a decision now.</p>

<h2>Improve Driver Support Without Adding More Noise</h2>

<p>Drivers do not need another stream of disconnected updates. They need timely instructions and a reliable answer when something changes. A virtual assistant can send scheduled reminders, collect confirmations, relay approved details from dispatch, and keep an activity record for every conversation.</p>

<p>This approach reduces repetitive calling while preserving escalation to a dispatcher. Questions involving rates, exceptions, safety concerns, customer commitments, or negotiation can be directed to the appropriate person. The assistant handles routine coordination; the dispatcher retains judgment and control.</p>

<h2>Treat Documentation as Part of the Load</h2>

<p>Documentation should be planned when the load is accepted, not reconstructed after delivery. The support workflow can track the expected document set, the responsible party, the due point, and the current status. A missing rate confirmation, bill of lading, lumper receipt, or proof of delivery can be identified while it is still actionable.</p>

<p>After the delivery, the same record supports invoicing and margin review. Over time, the organized history can help a company understand which lanes, load types, or customer workflows create avoidable administrative work. The goal is not merely to store files. The goal is to create a dependable path from load acceptance to final payment.</p>

<h2>Tasks a Dispatch Virtual Assistant Can Own</h2>

<p>The strongest support arrangement begins with a defined scope. Practical responsibilities can include:</p>

<ul>
  <li>Creating and updating standardized load records.</li>
  <li>Contacting drivers for assignment, arrival, and document confirmations.</li>
  <li>Following up with brokers when information or paperwork is missing.</li>
  <li>Preparing daily dispatch summaries and priority lists.</li>
  <li>Coordinating schedule changes and approved communication.</li>
  <li>Maintaining checklists for rate confirmation, pickup, delivery, and proof of delivery.</li>
  <li>Flagging urgent issues for dispatcher review instead of making unapproved decisions.</li>
</ul>

<p>Clear boundaries matter. A virtual assistant should not independently negotiate rates, make unauthorized commitments, or resolve safety-critical situations. Defining what can be handled directly and what requires escalation protects both the operation and the people involved.</p>

<h2>Start With One Workflow</h2>

<p>The safest way to introduce support is to begin with one repeatable process, such as gathering documents before pickup or collecting proof of delivery after a completed load. Document who currently performs each step, where the information is stored, how exceptions are communicated, and what completion looks like. Then give the virtual assistant clear templates, access requirements, and escalation rules.</p>

<p>After the workflow is stable, expand to more loads and more responsibilities. Review missed updates, document delays, response times, and exceptions with the dispatch team. This creates a practical feedback loop and prevents new technology from adding another disconnected process.</p>

<h2>Build a Dispatch Operation That Is Easy to Follow</h2>

<p>A trucking dispatch virtual assistant is most valuable when it makes the operation easier to understand. A clean load record, dependable driver communication, proactive document follow-up, and a concise daily view allow the dispatch team to respond with confidence. The work becomes less dependent on memory and less vulnerable to gaps between shifts.</p>

<p>For a growing fleet, that consistency creates a strong foundation. Dispatchers can focus on relationships and exceptions, drivers receive clearer support, and management can see what needs attention before a small issue becomes an expensive delay.</p>`,
  contentText: `Dispatch work rarely fails because a team lacks capable people. It fails because important details arrive through too many channels, arrive late, or remain visible to only one dispatcher. A load starts as a broker call, continues through a chain of messages, and ends with rate confirmation, documents, proof of delivery, and invoicing. If that information is scattered across inboxes, texts, notebooks, and portals, the dispatch team spends valuable time searching instead of making decisions.

A trucking dispatch virtual assistant provides a structured support layer around that work. The assistant can maintain a consistent load record, coordinate driver and broker communication, track missing documents, and keep the next action visible. This gives dispatchers more time for carrier relationships, problem solving, and profitable load decisions while helping drivers receive clear information without waiting for repeated follow-up.

Why Dispatch Administration Becomes a Bottleneck

A busy dispatch operation receives requests at the same time that drivers need updates, brokers need documents, and managers need a clear view of the board. Without an owner for the administrative details, the dispatcher becomes the owner of everything. Small delays then combine into larger problems: a driver waits for paperwork, a broker cannot confirm coverage, a rate detail is missed, and the next load is delayed.

The recurring pressure usually comes from three areas:

Load visibility: important status changes are communicated verbally or inside separate message threads.

Driver communication: repeated questions consume time even when the answer is simple.

Document control: rates, confirmations, bills of lading, proofs of delivery, and invoices are easy to overlook.

Build One Operating Rhythm for Every Load

A dependable workflow does not require complicated software. It requires the same sequence for every load and a clear owner for each step. A dispatch virtual assistant can help establish this sequence:

Record the load details, broker requirements, equipment type, timing, and rate information.

Confirm coverage with the driver and send one complete reference sheet.

Track milestones such as assignment, pickup, arrival, loading, delivery, and proof of delivery.

Flag missing documents before they become delays.

Close the load with an organized record that supports billing and future rate analysis.

When each load follows the same rhythm, dispatchers can scan the board more quickly. They can see which loads are covered, which documents are outstanding, which drivers need follow-up, and which opportunities require a decision now.

Improve Driver Support Without Adding More Noise

Drivers do not need another stream of disconnected updates. They need timely instructions and a reliable answer when something changes. A virtual assistant can send scheduled reminders, collect confirmations, relay approved details from dispatch, and keep an activity record for every conversation.

This approach reduces repetitive calling while preserving escalation to a dispatcher. Questions involving rates, exceptions, safety concerns, customer commitments, or negotiation can be directed to the appropriate person. The assistant handles routine coordination; the dispatcher retains judgment and control.

Treat Documentation as Part of the Load

Documentation should be planned when the load is accepted, not reconstructed after delivery. The support workflow can track the expected document set, the responsible party, the due point, and the current status. A missing rate confirmation, bill of lading, lumper receipt, or proof of delivery can be identified while it is still actionable.

After the delivery, the same record supports invoicing and margin review. Over time, the organized history can help a company understand which lanes, load types, or customer workflows create avoidable administrative work. The goal is not merely to store files. The goal is to create a dependable path from load acceptance to final payment.

Tasks a Dispatch Virtual Assistant Can Own

The strongest support arrangement begins with a defined scope. Practical responsibilities can include:

Creating and updating standardized load records.

Contacting drivers for assignment, arrival, and document confirmations.

Following up with brokers when information or paperwork is missing.

Preparing daily dispatch summaries and priority lists.

Coordinating schedule changes and approved communication.

Maintaining checklists for rate confirmation, pickup, delivery, and proof of delivery.

Flagging urgent issues for dispatcher review instead of making unapproved decisions.

Clear boundaries matter. A virtual assistant should not independently negotiate rates, make unauthorized commitments, or resolve safety-critical situations. Defining what can be handled directly and what requires escalation protects both the operation and the people involved.

Start With One Workflow

The safest way to introduce support is to begin with one repeatable process, such as gathering documents before pickup or collecting proof of delivery after a completed load. Document who currently performs each step, where the information is stored, how exceptions are communicated, and what completion looks like. Then give the virtual assistant clear templates, access requirements, and escalation rules.

After the workflow is stable, expand to more loads and more responsibilities. Review missed updates, document delays, response times, and exceptions with the dispatch team. This creates a practical feedback loop and prevents new technology from adding another disconnected process.

Build a Dispatch Operation That Is Easy to Follow

A trucking dispatch virtual assistant is most valuable when it makes the operation easier to understand. A clean load record, dependable driver communication, proactive document follow-up, and a concise daily view allow the dispatch team to respond with confidence. The work becomes less dependent on memory and less vulnerable to gaps between shifts.

For a growing fleet, that consistency creates a strong foundation. Dispatchers can focus on relationships and exceptions, drivers receive clearer support, and management can see what needs attention before a small issue becomes an expensive delay.`,
};

function imageUrl(filename) {
  return `/Blog%20Images/${encodeURIComponent(filename)}`;
}

function filenameFromUrl(value) {
  try {
    const pathname = new URL(value, "https://local.invalid").pathname;
    return decodeURIComponent(path.posix.basename(pathname));
  } catch {
    return "";
  }
}

function localizeContentImages(content) {
  return content.replace(remoteBlogImagePattern, (_url, sourceFilename) => {
    const filename = contentImageOverrides.get(sourceFilename) ?? sourceFilename;
    if (!localFileSet.has(filename)) {
      throw new Error(`No local Blog Images file for content image: ${sourceFilename}`);
    }
    return imageUrl(filename);
  });
}

function removeTrailingText(content, text) {
  let normalized = content.trimEnd();
  const suffix = ` ${text}`;
  while (normalized.endsWith(suffix)) {
    normalized = normalized.slice(0, -suffix.length).trimEnd();
  }
  return normalized;
}

function upsertBySlug(items, item) {
  const index = items.findIndex((post) => post.slug === item.slug);
  if (index === -1) {
    items.push(item);
    return true;
  }
  items[index] = { ...items[index], ...item };
  return false;
}

async function replaceFile(temporaryFile, destinationFile) {
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      await rename(temporaryFile, destinationFile);
      return;
    } catch (error) {
      const canRetry = error && ["EBUSY", "EPERM"].includes(error.code);
      if (!canRetry || attempt === 5) throw error;
      await delay(attempt * 100);
    }
  }
}

const entries = await readdir(imageDirectory, { withFileTypes: true });
const localFiles = entries
  .filter((entry) => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()))
  .map((entry) => entry.name)
  .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));
const localFileSet = new Set(localFiles);

for (const [slug, filename] of primaryImageOverrides) {
  if (!localFileSet.has(filename)) {
    throw new Error(`Missing image for ${slug}: ${filename}`);
  }
}
if (!localFileSet.has(additionalPost.filename)) {
  throw new Error(`Missing image for ${additionalPost.slug}: ${additionalPost.filename}`);
}

const [blogSource, fullBlogSource, summaryBlogSource] = await Promise.all([
  readFile(blogFile, "utf8"),
  readFile(fullBlogFile, "utf8"),
  readFile(summaryBlogFile, "utf8"),
]);
const sourcePosts = JSON.parse(blogSource);
const fullPosts = JSON.parse(fullBlogSource);
const summaryPosts = JSON.parse(summaryBlogSource);
const duplicateCount = sourcePosts.filter((post) => post.id === duplicatePostId).length;
const posts = sourcePosts.filter((post) => post.id !== duplicatePostId);

for (const post of posts) {
  const override = primaryImageOverrides.get(post.slug);
  const filename = override ?? filenameFromUrl(post.image);
  if (!localFileSet.has(filename)) {
    throw new Error(`No local Blog Images file for ${post.slug}: ${post.image}`);
  }
  post.image = imageUrl(filename);
  post.content = localizeContentImages(post.content);
}

const originalTruckingPost = posts.find(
  (post) => post.slug === "trucking-dispatch-virtual-assistant-system",
);
const originalFullTruckingPost = fullPosts.find(
  (post) => post.slug === "trucking-dispatch-virtual-assistant-system",
);
if (!originalTruckingPost || !originalFullTruckingPost) {
  throw new Error("Missing original trucking post");
}
const previousTruckingImage = `<p><img src="${imageUrl(additionalPost.filename)}" alt="Trucking dispatch virtual assistant support"></p>`;
originalTruckingPost.content = originalTruckingPost.content
  .split(previousTruckingImage)
  .join("")
  .trimEnd();
originalFullTruckingPost.contentHtml = originalFullTruckingPost.contentHtml
  .split(previousTruckingImage)
  .join("")
  .trimEnd();
originalFullTruckingPost.contentText = removeTrailingText(
  originalFullTruckingPost.contentText,
  "Trucking dispatch virtual assistant support.",
);
originalFullTruckingPost.contentLength = originalFullTruckingPost.contentText.length;

const addedCanonicalPost = upsertBySlug(posts, {
  id: additionalPost.id,
  slug: additionalPost.slug,
  title: additionalPost.title,
  excerpt: additionalPost.excerpt,
  content: additionalPost.contentHtml,
  image: imageUrl(additionalPost.filename),
  link: `https://virtualnexgen.com/blog/${additionalPost.slug}`,
  author: "Virtual Nexgen Team",
  date: "2026-08-20",
  tags: ["Blog"],
  createdAt: "2026-09-25T00:00:00.000Z",
});
upsertBySlug(fullPosts, {
  id: 1011,
  title: additionalPost.title,
  slug: additionalPost.slug,
  url: `https://virtualnexgen.com/blog/${additionalPost.slug}`,
  date: null,
  image: imageUrl(additionalPost.filename),
  excerpt: additionalPost.excerpt,
  contentHtml: additionalPost.contentHtml,
  contentText: additionalPost.contentText,
  contentLength: additionalPost.contentText.length,
  ok: true,
});

for (const fullPost of fullPosts) {
  const blogPost = posts.find((post) => post.slug === fullPost.slug);
  if (blogPost) fullPost.image = blogPost.image;
  fullPost.contentHtml = localizeContentImages(fullPost.contentHtml);
  fullPost.contentText = localizeContentImages(fullPost.contentText);
}

for (const fullPost of fullPosts) {
  if (!fullPost.contentHtml?.trim() || !fullPost.contentText?.trim()) {
    throw new Error(`Full content is missing: ${fullPost.slug}`);
  }
  if (fullPost.contentLength !== fullPost.contentText.length) {
    throw new Error(`Full content length is invalid: ${fullPost.slug}`);
  }
}

for (const summaryPost of summaryPosts) {
  const blogPost = posts.find((post) => post.slug === summaryPost.slug);
  if (!blogPost) throw new Error(`Missing canonical post: ${summaryPost.slug}`);
  summaryPost.image = blogPost.image;
}
upsertBySlug(summaryPosts, {
  id: 1011,
  title: additionalPost.title,
  slug: additionalPost.slug,
  image: imageUrl(additionalPost.filename),
  excerpt: additionalPost.excerpt,
});

if (JSON.stringify(posts).match(remoteBlogImagePattern)) {
  throw new Error("Remote blog image URL remains in blog.json");
}
if (JSON.stringify(fullPosts).match(remoteBlogImagePattern)) {
  throw new Error("Remote blog image URL remains in blogs_full.json");
}
if (JSON.stringify(summaryPosts).match(remoteBlogImagePattern)) {
  throw new Error("Remote blog image URL remains in blogs_data.json");
}

const ids = new Set();
const slugs = new Set();
const primaryFiles = new Set();
for (const post of posts) {
  if (ids.has(post.id)) throw new Error(`Duplicate post id: ${post.id}`);
  if (slugs.has(post.slug)) throw new Error(`Duplicate post slug: ${post.slug}`);
  if (!post.content?.trim()) throw new Error(`Content is missing: ${post.slug}`);
  ids.add(post.id);
  slugs.add(post.slug);
  const filename = filenameFromUrl(post.image);
  if (!localFileSet.has(filename)) {
    throw new Error(`Post image is not local: ${post.slug}`);
  }
  primaryFiles.add(filename);
}

for (const [fileName, items] of [
  ["blog.json", posts],
  ["blogs_full.json", fullPosts],
  ["blogs_data.json", summaryPosts],
]) {
  if (items.length !== localFiles.length) {
    throw new Error(`${fileName} must contain ${localFiles.length} blog posts`);
  }
  const itemSlugs = new Set();
  for (const item of items) {
    if (itemSlugs.has(item.slug)) throw new Error(`Duplicate ${fileName} slug: ${item.slug}`);
    itemSlugs.add(item.slug);
    if (!posts.some((post) => post.slug === item.slug)) {
      throw new Error(`Missing canonical post in ${fileName}: ${item.slug}`);
    }
  }
}

const missingFiles = localFiles.filter((filename) => !primaryFiles.has(filename));
if (missingFiles.length > 0) {
  throw new Error(`Images not used as blog posts: ${missingFiles.join(", ")}`);
}

const blogTemporaryFile = `${blogFile}.${process.pid}.tmp`;
const fullBlogTemporaryFile = `${fullBlogFile}.${process.pid}.tmp`;
const summaryBlogTemporaryFile = `${summaryBlogFile}.${process.pid}.tmp`;
await Promise.all([
  writeFile(blogTemporaryFile, `${JSON.stringify(posts, null, 2)}\n`, "utf8"),
  writeFile(fullBlogTemporaryFile, `${JSON.stringify(fullPosts, null, 2)}\n`, "utf8"),
  writeFile(summaryBlogTemporaryFile, `${JSON.stringify(summaryPosts, null, 2)}\n`, "utf8"),
]);
await Promise.all([
  replaceFile(blogTemporaryFile, blogFile),
  replaceFile(fullBlogTemporaryFile, fullBlogFile),
  replaceFile(summaryBlogTemporaryFile, summaryBlogFile),
]);

console.log(
  JSON.stringify(
    {
      posts: posts.length,
      fullContentPosts: fullPosts.length,
      summaryPosts: summaryPosts.length,
      localImages: localFiles.length,
      primaryImages: primaryFiles.size,
      secondaryImages: 0,
      addedPosts: addedCanonicalPost ? 1 : 0,
      removedDuplicate: duplicateCount,
    },
    null,
    2,
  ),
);
