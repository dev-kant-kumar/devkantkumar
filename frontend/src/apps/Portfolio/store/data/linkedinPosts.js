/**
 * LinkedIn posts database for devkantkumar.com
 *
 * Add new items in this array whenever you want to show a new post.
 *
 * Each post supports:
 * - embed (LinkedIn embed HTML)
 * - url (for posts that don't support embed)
 * - type: "embed" or "link"
 */

const linkedinPosts = [
  {
    id: 1,
    type: "embed",
    embedHtml: `
      <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7393907249875816448?collapsed=1" height="542" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
    `,
  },

  {
    id: 2,
    type: "link",
    image:
      "https://media.licdn.com/dms/image/v2/D4D22AQGAvYrqm_zRpQ/feedshare-shrink_2048_1536/B4DZqIhrT0KIAw-/0/1763227122863?e=1764806400&v=beta&t=ieHQ8tSdzj6SsPAgQFwvPxXd9KYp4fg42UEmL-rRtzs",
    url: "https://www.linkedin.com/posts/devkantkumar_python-recursion-generators-activity-7395510591085359104-tM9b?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEKa7t8Ba5Beoekei9nrp5EpJX241t86c5o",
    title:
      "Day 2 of mastering Python functions - tackled the two most mind-bending concepts back-to-back!",
    description: `Mastered two Python brain-twisters today — Recursion and Generators!

🔁 Recursion:
Built recursive functions (sum, factorial, list prints), hit Python’s recursion limit, and learned how to extend it. Biggest lesson: no base case = recursion explosion 😅

⏯️ Generators:
Explored yield, .send(), counters, and even a Fibonacci generator that fried my brain 🔥 These things pause + resume like magic!

Takeaway:
Recursion = calls itself ↩️
Generators = pause & continue ⏯️
Both help solve repetitive problems elegantly.

Loving this journey — one mind-bend at a time!
Has your brain ever melted learning these? 😄🔥`,
  },
  {
    id: 3,
    type: "embed",
    embedHtml: `
      <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7366718763217432576?collapsed=1" height="611" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
    `,
  },
];

export default linkedinPosts;
