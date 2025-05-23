import { IAnalyticsItem } from "@interfaces/Analytics.interface";
import { IAnalyticsOrders } from "@interfaces/bll/analytics.interface";

export const setDataAnalyticsForOrders = (
  ordersAnalytics: IAnalyticsOrders
): IAnalyticsItem[] => {
  return [
    {
      text: "Amount of total orders ",
      data: [{ value: ordersAnalytics.totalOrders, color: "#C80F0F" }],
    },
    {
      text: "Total orders completed",
      data: [
        { value: ordersAnalytics.totalCompletedOrders, color: "#C80F0F" },
        { value: ordersAnalytics.totalOrders, color: "#f5f5f5" },
      ],
    },
    {
      text: "Total orders completed this month",
      data: [
        {
          value: ordersAnalytics.totalOrdersUpdatedThisMonth,
          color: "#C80F0F",
        },
        { value: ordersAnalytics.totalOrders, color: "#f5f5f5" },
      ],
    },
    {
      text: "Total orders completed this week",
      data: [
        { value: ordersAnalytics.totalOrdersUpdatedThisWeek, color: "#C80F0F" },
        { value: ordersAnalytics.totalOrders, color: "#f5f5f5" },
      ],
    },
  ];
};

export const setNonClothingDataAnalyticsForOrders = (
  ordersAnalytics: IAnalyticsOrders
): IAnalyticsItem[] => {
  return [
    {
      text: "Amount of total orders ",
      data: [
        {
          value: ordersAnalytics.nonCustomClothingAnalytics.totalOrders,
          color: "#C80F0F",
        },
      ],
    },
    {
      text: "Total orders completed",
      data: [
        {
          value:
            ordersAnalytics.nonCustomClothingAnalytics.totalCompletedOrders,
          color: "#C80F0F",
        },
        {
          value: ordersAnalytics.nonCustomClothingAnalytics.totalOrders,
          color: "#f5f5f5",
        },
      ],
    },
    {
      text: "Total orders completed this month",
      data: [
        {
          value:
            ordersAnalytics.nonCustomClothingAnalytics
              .totalOrdersUpdatedThisMonth,
          color: "#C80F0F",
        },
        {
          value: ordersAnalytics.nonCustomClothingAnalytics.totalOrders,
          color: "#f5f5f5",
        },
      ],
    },
    {
      text: "Total orders completed this week",
      data: [
        {
          value:
            ordersAnalytics.nonCustomClothingAnalytics
              .totalOrdersUpdatedThisWeek,
          color: "#C80F0F",
        },
        {
          value: ordersAnalytics.nonCustomClothingAnalytics.totalOrders,
          color: "#f5f5f5",
        },
      ],
    },
  ];
};
