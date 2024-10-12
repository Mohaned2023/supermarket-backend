SELECT 
	COUNT("id") AS "totalNumberOfItem",
	AVG("sellPillPrice") AS "avgSellPillPrice",
	AVG("buyPillPrice") AS "avgBuyPillPrice",
	SUM("numberOfItems") AS "totalNumberOfAllItems",
	SUM("sellAllItemsPrice") AS "totalSellPrice",
	SUM("buyAllItemsPrice") AS "totalBuyPrice",
	TO_TIMESTAMP(
		AVG (
			EXTRACT(EPOCH FROM "productionDate")
		)
	) AS "avgProductionDate",
	TO_TIMESTAMP(
		AVG (
			EXTRACT(EPOCH FROM "expiryDate")
		)
	) AS "avgExpiryDate"
FROM items;