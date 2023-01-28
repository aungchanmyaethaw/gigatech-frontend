import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ContainerStyled, UnderLine } from "styles/global.styles";
const PreviewSkeleton = ({ heading }) => {
  return (
    <ContainerStyled>
      <div className="flex flex-col items-center mb-20">
        <h2 className="text-3xl lg:text-[40px] text-center font-normal capitalize">
          {heading}
        </h2>
        <UnderLine />
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-4">
        <SkeletonTheme baseColor="#ddd" highlightColor="#fff">
          <article>
            <Skeleton height={260} width={"100%"} />
            <div className="flex flex-col gap-2 mt-8">
              <Skeleton width={120} />
              <Skeleton count={2} />
              <Skeleton width={80} />
            </div>
          </article>
          <article>
            <Skeleton height={260} />
            <div className="flex flex-col gap-2 mt-8">
              <Skeleton width={120} />
              <Skeleton count={2} />
              <Skeleton width={80} />
            </div>
          </article>
          <article>
            <Skeleton height={260} />
            <div className="flex flex-col gap-2 mt-8">
              <Skeleton width={120} />
              <Skeleton count={2} />
              <Skeleton width={80} />
            </div>
          </article>
          <article>
            <Skeleton height={260} />
            <div className="flex flex-col gap-2 mt-8">
              <Skeleton width={120} />
              <Skeleton count={2} />
              <Skeleton width={80} />
            </div>
          </article>
        </SkeletonTheme>
      </div>
    </ContainerStyled>
  );
};

export default PreviewSkeleton;
