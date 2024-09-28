import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import LogoRound from "../Svg/Icons/LogoRound";
import Text from "../Text/Text";
import Skeleton from "../Skeleton/Skeleton";
import { Colors } from "../../theme";

export interface Props {
  color?: keyof Colors;
  showSkeleton?: boolean;
  chainId: number;
}

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  &:hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const CakePrice: React.FC<React.PropsWithChildren<Props>> = ({
  color = "textSubtle",
  showSkeleton = true,
  chainId,
}) => {
  const [cakePriceUsd, setCakePriceUsd] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=crossfi-2&vs_currencies=usd`);
        const data = await response.json();
        if (data["crossfi-2"]) {
          setCakePriceUsd(data["crossfi-2"].usd);
        }
      } catch (error) {
        console.error("Ошибка при получении цены:", error);
      }
    };

    fetchPrice();
  }, []);

  return cakePriceUsd ? (
    <PriceLink
      href={`https://pancakeswap.finance/swap?outputCurrency=0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82&chainId=${chainId}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <LogoRound width="24px" mr="8px" />
      <Text color={color} bold>{`$${cakePriceUsd.toFixed(3)}`}</Text>
    </PriceLink>
  ) : showSkeleton ? (
    <Skeleton width={80} height={24} />
  ) : null;
};

export default React.memo(CakePrice);
