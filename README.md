# Cloggers

Cloggers is deployed on [GitHub Pages](https://sequenter.github.io/Cloggers/).

Cloggers utilises [TempleOSRS APIs](https://templeosrs.com/api_doc.php) to collate and display group collection log completion. This includes:

- Collectively displaying how many members have achieved a collection log, across all collection items
- The most collected - and therefore common - items within the group
- The least collected - and therefore scarce - items within the group
- Which members have collected which items (and which haven't!)
- The ability to filter collections by members
- Group rankings by the amount of collected items
- Unique collection items achieved by group members
- Recently collected items within the last month (max 200)

To be able to utilise this tool, OSRS players will need to install the [TempleOSRS plugin](https://runelite.net/plugin-hub/show/temple-osrs) and sync their collection logs in-game. Oonce synced, members will need to be a part of a [TempleOSRS group](https://templeosrs.com/groups/view_groups.php). Then, simply search for the group ID to view group collection log stats.

A **huge** thank you to the TempleOSRS team for making fun little projects like this possible!

## Development

Cloggers is a [React](https://react.dev/) project built with [Vite](https://vite.dev/), utilising [TypeScript](https://www.typescriptlang.org/). To develop this project locally:

- Clone the repository
- `npm i` to install dependencies
- `npm run dev` to launch the server locally

This project uses [CORS Anywhere](https://github.com/Rob--W/cors-anywhere) as a CORS proxy to avoid issues when communicating with the API. This will require visiting the proxy [here](https://cors-anywhere.herokuapp.com/corsdemo) and launching the temporary demo access, otherwise API calls will result in an error.
