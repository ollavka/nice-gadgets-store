/* eslint-disable no-plusplus */
import { Breakpoint } from '../types';

type Page = {
  link: number;
  label: string | number;
};

const generatePageNumbers = (
  pageCount: number,
  currentPage: number,
  visiblePages: number,
) => {
  if (pageCount <= visiblePages) {
    return Array.from({ length: pageCount }, (_, idx) => ({
      link: idx + 1,
      label: idx + 1,
    }));
  }

  const pages: Page[] = [];

  if (currentPage <= visiblePages - 4) {
    for (let i = 1; i <= visiblePages - 2; i++) {
      pages.push({ link: i, label: i });
    }

    pages.push(
      {
        link: pages[pages.length - 1].link + 1,
        label: '...',
      },
      {
        link: pageCount,
        label: pageCount,
      },
    );
  } else if (currentPage >= pageCount - visiblePages + 5) {
    pages.push(
      { link: 1, label: 1 },
      { link: pageCount - visiblePages + 4, label: '...' },
    );

    for (let i = pageCount - visiblePages + 3; i <= pageCount; i++) {
      pages.push({ link: i, label: i });
    }
  } else {
    pages.push({ link: 1, label: 1 }, { link: currentPage - 3, label: '...' });
    pages.push(
      { link: currentPage - 2, label: currentPage - 2 },
      { link: currentPage - 1, label: currentPage - 1 },
    );
    pages.push({ link: currentPage, label: currentPage });
    pages.push(
      { link: currentPage + 1, label: currentPage + 1 },
      { link: currentPage + 2, label: currentPage + 2 },
    );
    pages.push(
      { link: currentPage + 3, label: '...' },
      { link: pageCount, label: pageCount },
    );
  }

  return pages;
};

export const getPageNumbers = (
  breakpoint: Breakpoint,
  pageCount: number,
  currentPage: number,
  visiblePages: number,
) => {
  if (breakpoint === Breakpoint.Mobile) {
    return `page ${currentPage} / ${pageCount}`;
  }

  return generatePageNumbers(pageCount, currentPage, visiblePages);
};
