function Header({ issues }) {

const total = issues.length;

const open = issues.filter(issue => issue.status === "OPEN").length;

const resolved = issues.filter(issue => issue.status === "RESOLVED").length;

return (

<header>

<h1>Issue Tracker</h1>

<p>Total Issues: {total}</p>

<p>Open: {open}</p>

<p>Resolved: {resolved}</p>

</header>

);

}

export default Header;