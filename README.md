<div align="center">
    <img src="https://i.ibb.co/FHT4MP5/rg-logo.png" width="25%"/>
    <a href="https://maizepicks.vercel.app" style="color: #303030;"><h1>Picks</h1></a>
    <h4>Maize Picks is a platform to post and get daily sports betting picks and winning predictions. Key stats like profits, ROI, streaks, and many more tracked over intervals of time.</h4>
</div>

<div align="center">
    <img src="https://img.shields.io/github/last-commit/arsantiagolopez/picks?label=updated"/>
    <a href="https://github.com/arsantiagolopez/picks/blob/main/LICENSE"><img src="https://img.shields.io/github/license/arsantiagolopez/picks?color=303030" /></a>
    <img src="https://img.shields.io/github/languages/top/arsantiagolopez/picks" />
</div>

<div align="center">
	<a href="https://alexandersantiago.com/"><img src="https://alexandersantiago.com/alex.png" width="24" style="margin-left: -1em;" /></a>
	<a href="https://instagram.com/asantilopez"><img src="https://cdn2.iconfinder.com/data/icons/black-white-social-media/32/instagram_online_social_media_photo-1024.png" width="25" /></a>
	<a href="https://twitter.com/arsantiagolopez"><img src="https://cdn2.iconfinder.com/data/icons/black-white-social-media/32/twitter_online_social_media-512.png" width="25" /></a>
	<a href="mailto:arsantiagolopez@gmail.com"><img src="https://cdn4.iconfinder.com/data/icons/black-white-social-media/32/mail_email_envelope_send_message-1024.png" width="25" /></a>
</div>

<div align="center">
  <a href="#preview">Preview</a> •
  <a href="#features">Features</a> •
  <a href="#tech">Tech Stack</a> •
  <a href="#inspiration">Inspiration</a> •
  <a href="#objectives">Learning</a> •
  <a href="#license">License</a> •
  <a href="#contact">Contact</a>
</div>

<h2 id="preview">⚡ Preview</h2>

<details open>
  <summary>Mobile</summary>
  <img src="https://github.com/arsantiagolopez/gifs/blob/main/picks/mobile.gif" />
</details>

<details>
  <summary>Desktop</summary>
  <img src="https://github.com/arsantiagolopez/gifs/blob/main/picks/desktop.gif" />
</details>

<h2 id="features">🎯 Features</h2>

- Currently being used in production.
- Average 15,000 new users a month.
- Light/Dark mode.
- Daily sports betting tips displayed in tomorrow's, today's and past sections.
- Tips are displayed in cards with the tour level logo, start time, tournament name, headline, prediction, odds, units staked and reasoning.
- Completed predictions are graded with either a win, loss, or push, and the resulting profits are displayed on the slip.
- Stats are automatically calculated and displayed on the Records and Stats page.
- The Records page shows the most important stats in the win/loss/push overall record; return on investment (ROI), units staked, units returned, and others.
- The Stats page shows more detailed stats like the total amount of picks, days tracked, current streaks, longest streaks, win percentage, profits over a week, a month, a year, overall. There's also a projections section that allows you to calculate how much money you would have made if you followed the tipster's tips on different intervals.
- Admins have access to protected routes where they can add new tips or parlays and decide on preferred picks release time or preferred UI for users.
- Admins can update picks before the match starts and update time displayed on the pick for tipster's credibility.
- Admins can grade the pick as a win, loss, or push after the event has finished.

<h2 id="tech">‎‍💻 Tech Stack</h2>

### Client

<table>
  <tr>
      <th>Tech</th>
      <th>What for</th>
  </tr>
    <tr>
      <td><a href="https://www.typescriptlang.org/">TypeScript</a></td>
      <td>Make coding fun again.</td>
  </tr>
  <tr>
      <td><a href="https://reactjs.org/">React</a></td>
      <td>Build a component-based user interface.</td>
  </tr>
  <tr>
      <td><a href="https://nextjs.org/">Next.js</a></td>
      <td>Server-side rendering (SSR) of React components.</td>
  </tr>
    <tr>
    <td><a href="https://tailwindcss.com/">Tailwind CSS</td>
    <td>Fast & powerful way to build a beautiful UI.</td>
  </tr>
    <tr>
      <td><a href="https://headlessui.dev/">Headless UI</a></td>
      <td>UI components for Tailwind CSS.</td>
    </tr>
    <tr>
      <td><a href="https://react-hook-form.com/">React Hook Form</a></td>
      <td>Form state management and validation.</td>
  </tr>
  <tr>
      <td><a href="https://react-select.com/">React Select</a></td>
      <td>Select input control component for React.</td>
  </tr>
  <tr>
      <td><a href="https://virtuoso.dev/">React Virtuoso</a></td>
      <td>Efficiently render large data sets.</td>
    </tr>
    <tr>
      <td><a href="https://nivo.rocks/">Nivo Graphs</a></td>
      <td>Data visualization.</td>
  </tr>
  <tr>
      <td><a href="https://swr.vercel.app/">SWR</a></td>
      <td>Cache & data fetching.</td>
  </tr>
  <tr>
      <td><a href="https://axios-http.com/docs/intro">Axios</a></td>
      <td>HTTP promise-based data fetching requests.</td>
  </tr>
  <tr>
      <td><a href="https://momentjs.com/">Moment.js</a></td>
      <td>Parse & display dates.</td>
  </tr>
</table>

### Server

<table>
    <tr>
        <th>Tech</th>
        <th>What for</th>
    </tr>
    <tr>
      <td><a href="https://www.typescriptlang.org/">TypeScript</a></td>
      <td>Make coding fun again.</td>
  </tr>
    <tr>
        <td><a href="https://nodejs.org/">Node.js</a></td>
        <td>JavaScript runtime environment.</td>
    </tr>
    <tr>
        <td><a href="https://nextjs.org/">Next.js API</a></td>
        <td>API endpoints as Node.js serverless functions.</td>
    </tr>
    </tr>
        <tr>
        <td><a href="https://www.mongodb.com/">MongoDB</a></td>
        <td>NoSQL document-based database.</td>
    </tr>
    <tr>
        <td><a href="https://www.mongoose.com/">Mongoose</a></td>
        <td>Interact with the database.</td>
    </tr>
    <tr>
        <td><a href="https://next-auth.js.org/">NextAuth.js</a></td>
        <td>Local and social authentication solution.</td>
    </tr>
     <tr>
      <td><a href="https://axios-http.com/docs/intro">Axios</a></td>
      <td>Fetch data with promise-based HTTP requests.</td>
  </tr>
    <tr>
        <td>REST API</td>
        <td>HTTP API architecture.</td>
    </tr>
</table>

### DevOps

<table>
    <tr>
        <th>Tech</th>
        <th>What for</th>
    </tr>
    <tr>
        <td><a href="https://vercel.com/">Vercel</a></td>
        <td>Host the client.</td>
    </tr>
    <tr>
        <td><a href="https://docs.polygon.technology/docs/develop/network-details/network/">MongoDB Atlas</a></td>
        <td>Host the database.</td>
    </tr>
</table>

<h2 id="inspiration">💡 Inspiration</h2>

There's a very interesting subreddit in Reddit: [/r/sportsbook](https://www.reddit.com/r/sportsbook/). This subreddit is dedicated to sports betting tips. In it, there's a daily thread called the "Pick of the Day," which drops at a set time every day. On this thread, tipsters from all around the world post their picks along with their record. The highest upvoted comments rise to the top, and the most downvoted sink to the bottom. My client wanted to replicate a similar environment where he could post his daily picks, keep track of his record, and showcase other important stats that a simple comment thread could not include. Graphs, projections, an interactive UI. etc.

Maize Picks is a simple, minimal solution that emcompasses the selling product (the reliable tips) and allows the audience to, in simple terms, get in and get out. The platform fosters a mutual relationship where the owner posts his picks and the users see them.

<h2 id="objectives">🚀 Learning Objectives</h2>

- Master TypeScript.
- Master Tailwind CSS.
- Handle large numbers & calculations.
- Integrate client's features on a timely basis.
- Deploy new features to production while maintaining the product up and running.

<h2 id="license">📜 License</h2>

[![License](https://img.shields.io/github/license/arsantiagolopez/picks?color=303030)](./LICENSE)

<h2 id="contact">☕ Contact me</h2>

<div align="left">
	<a href="https://alexandersantiago.com/"><img src="https://alexandersantiago.com/alex.png" width="40" /></a>
	<a href="https://instagram.com/asantilopez"><img src="https://cdn2.iconfinder.com/data/icons/black-white-social-media/32/instagram_online_social_media_photo-1024.png" width="40" /></a>
	<a href="https://twitter.com/arsantiagolopez"><img src="https://cdn2.iconfinder.com/data/icons/black-white-social-media/32/twitter_online_social_media-512.png" width="40" /></a>
	<a href="mailto:arsantiagolopez@gmail.com"><img src="https://cdn4.iconfinder.com/data/icons/black-white-social-media/32/mail_email_envelope_send_message-1024.png" width="40" /></a>
</div>
