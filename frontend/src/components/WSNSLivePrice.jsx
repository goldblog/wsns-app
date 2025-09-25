import React, { useEffect, useState } from 'react';

export default function WSNSLivePrice() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/wsns/price')
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h2>wSNS Live Price</h2>
      {data ? (
        <div>
          <p>USD: ${data.price}</p>
          {data.eth && <p>ETH: {data.eth}</p>}
          <p>Source: {data.source}</p>
          {data.change && <p>24h Change: {data.change}%</p>}
        </div>
      ) : (
        <p>Loading…</p>
      )}
    </div>
  );
}