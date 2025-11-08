// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const { parseISO, isToday, isThisWeekend, isAfter, startOfToday } = require("date-fns");

server.use(middlewares);

server.use((req, res, next) => {
  if (req.path === "/events") {
    let events = router.db.get("events").value();

    // ✅ Only keep today or future events
    events = events.filter((event) =>
      isAfter(parseISO(event.date), startOfToday()) || isToday(parseISO(event.date))
    );

    // Apply dateFilter (today / weekend)
        if (req.query.dateFilter) {
    if (req.query.dateFilter === "today") {
        events = events.filter((event) => isToday(parseISO(event.date)));
    }
    if (req.query.dateFilter === "weekend") {
        events = events.filter((event) => isThisWeekend(parseISO(event.date)));
    }
    }


    res.jsonp(events);
    return;
  }
  next();
});

server.use(router);
server.listen(5000, () => {
  console.log("JSON Server is running at http://localhost:5000");
});
