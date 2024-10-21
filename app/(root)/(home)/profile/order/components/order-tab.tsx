import React, { useRef, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useFetchOrder from "@/hooks/use-fetch-order";
import { Spinner } from "@/components/spinner";
import Image from "next/image";
import PaginationComponent from "@/components/pagination";
import { OrderData } from "./order-data";

type Tab = {
  id: string;
  title: string;
  disabled?: boolean;
};

const tabs: Tab[] = [
  {
    id: "All",
    title: "Tất cả",
  },
  {
    id: "Pending",
    title: "Đang xử lý",
  },
  {
    id: "Create",
    title: "Xác nhận",
  },
  {
    id: "Shipping",
    title: "Đang giao hàng",
  },
  {
    id: "Success",
    title: "Hoàn thành",
  },
  {
    id: "Cancel",
    title: "Đã hủy",
  },
  {
    id: "Return",
    title: "Trả hàng",
  },
];

export default function OrderTabs() {
  const tabsRef = useRef<HTMLUListElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  const {
    data,
    loading,
    select: activeTab,
    setSelect: setActiveTab,
    setCurrentPage,
  } = useFetchOrder();

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const activeTabElement = activeTabRef.current;
    if (activeTabElement && tabsRef.current) {
      const scrollLeft =
        activeTabElement.offsetLeft -
        tabsRef.current.offsetWidth / 2 +
        activeTabElement.offsetWidth / 2;
      tabsRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeTab]);

  return (
    <div className="w-full mx-auto block md:hidden overflow-hidden">
      <nav className="relative text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <div className="overflow-x-auto scrollbar-hide">
          <ul ref={tabsRef} className="flex whitespace-nowrap -mb-px">
            {tabs.map((tab) => (
              <li key={tab.id} className="inline-block">
                <button
                  ref={activeTab === tab.id ? activeTabRef : null}
                  id={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`inline-block p-4 rounded-t-lg border-b-2 transition-colors duration-300 ${
                    tab.disabled
                      ? "text-gray-400 cursor-not-allowed dark:text-gray-500 border-transparent"
                      : activeTab === tab.id
                        ? "text-green-600 border-green-600 dark:text-green-500 dark:border-green-500 font-medium"
                        : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  }`}
                  disabled={tab.disabled}
                  aria-selected={activeTab === tab.id}
                  role="tab"
                >
                  {tab.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-green-600 dark:bg-green-500"
          layoutId="activeTab"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          style={{
            width: activeTabRef.current?.offsetWidth || 0,
            left: activeTabRef.current?.offsetLeft || 0,
          }}
        />
      </nav>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <Fragment>
              {data && data.result.length > 0 ? (
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-2 pt-3">
                    {data.result.map((item) => (
                      <OrderData key={item.id} order={item} />
                    ))}
                  </div>
                  <PaginationComponent
                    currentPage={data._currentPage}
                    totalPage={data._totalPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center flex-col space-y-2 w-full min-h-[30vh]">
                  <Image
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
                    alt="cart"
                    width={120}
                    height={120}
                  />
                  <p className="tracking-tighter text-[14px]">
                    Chưa có đơn hàng!
                  </p>
                </div>
              )}
            </Fragment>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
