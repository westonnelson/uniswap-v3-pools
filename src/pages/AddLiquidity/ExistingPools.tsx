import React, { useEffect } from "react";
import { Pool } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";

import { usePools } from "../../PoolsProvider";
import { useAppSettings } from "../../AppSettingsProvider";
import { PoolState } from "../../hooks/usePool";
import PoolButton from "../../ui/PoolButton";

interface Props {
  onPoolClick: (
    baseToken: Token,
    quoteToken: Token,
    pool: Pool,
    positions: any[]
  ) => void;
}

function ExistingPools({ onPoolClick }: Props) {
  const { pools } = usePools();
  const { filterClosed, setFilterClosed } = useAppSettings();

  useEffect(() => {
    const currentFilterClosed = filterClosed;
    if (currentFilterClosed) {
      setFilterClosed(false);
    }

    return function reset() {
      if (currentFilterClosed) {
        setFilterClosed(true);
      }
    };
  }, []); // this should run only on mount/unmount

  if (!pools.length) {
    return <div>Loading pools...</div>;
  }

  return (
    <div className="w-full flex flex-wrap">
      {pools.map(
        ({ key, baseToken, quoteToken, entity, positions }: PoolState) => (
          <div className="w-80 border border-gray-400 rounded my-3 mr-3 p-3 text-lg">
            <PoolButton
              key={key}
              baseToken={baseToken}
              quoteToken={quoteToken}
              fee={entity.fee / 10000}
              onClick={() =>
                onPoolClick(baseToken, quoteToken, entity, positions)
              }
            />
          </div>
        )
      )}
    </div>
  );
}

export default ExistingPools;
