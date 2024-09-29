import Image from "next/image";
import { memo } from "react";
import { HelpIcon, Box } from "@pancakeswap/uikit";
import { SpaceProps } from "styled-system";

export const ChainLogo = memo(
  ({
    chainId,
    width = 24,
    height = 24,
    ...props
  }: { chainId?: number; width?: number; height?: number } & SpaceProps) => {
    // Условная логика для изменения URL изображения
    const iconSrc =
      chainId === 4157 // Предполагая, что 4157 - это ID сети CrossFi
        ? "https://crossfi.org/src/assets/img/logo.svg"
        : `https://assets.pancakeswap.finance/web/chains/${chainId}.lpng`;

    const icon = chainId ? (
      <Image
        alt={`chain-${chainId}`}
        style={{ maxHeight: `${height}px` }}
        src={iconSrc} // Используем условный URL
        width={width}
        height={height}
        unoptimized
      />
    ) : (
      <HelpIcon width={width} height={height} />
    );

    return <Box {...props}>{icon}</Box>;
  }
);
