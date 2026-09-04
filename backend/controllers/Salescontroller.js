const Order = require("../models/Order");


const getSalesOverview = async (req, res) => {
  try {
    const paidOrders = await Order.find({
      status: {
        $in: ["confirmed", "shipped", "delivered"]
      }
    });

    const totalSales = paidOrders.reduce(
      (total, order) => total + Number(order.totalPrice || 0),
      0
    );

    const paidOrdersCount = paidOrders.length;

    const averageOrder =
      paidOrdersCount > 0
        ? totalSales / paidOrdersCount
        : 0;

    const productMap = {};

    paidOrders.forEach((order) => {
      order.items?.forEach((item) => {
        const productName = item.name || "Produit";

        if (!productMap[productName]) {
          productMap[productName] = 0;
        }

        productMap[productName] += Number(item.quantity || 0);
      });
    });

    const bestSellingProducts = Object.entries(productMap)
      .map(([name, quantity]) => ({
        name,
        quantity
      }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    res.status(200).json({
      success: true,
      totalSales,
      paidOrders: paidOrdersCount,
      averageOrder,
      bestSellingProducts
    });

  } catch (error) {
    console.error("Sales overview error:", error);

    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des statistiques"
    });
  }
};


module.exports = {
  getSalesOverview,
};