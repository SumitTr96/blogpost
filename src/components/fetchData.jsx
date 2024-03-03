import { useState, useEffect } from "react";
import DisplayData from "./displayData";

function MyComponent() {
  const [records, setRecords] = useState();

  useEffect(() => {
    fetch("https://saurav.tech/NewsAPI/sources.json")
      .then((response) => response.json())
      .then((data) => setRecords(data.sources))
      .catch((err) => console.log("Error while fetching", err));
  }, []);

  return (
    <section>
      <ul>
        {records?.map(({ id, country, name, description, url }) => (
          <DisplayData
            key={id}
            userId={id}
            name={name}
            country={country}
            description={description}
            url={url}
          />
        ))}
      </ul>
    </section>
  );
}

export default MyComponent;
