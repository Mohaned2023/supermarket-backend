SELECT 
    -- The number of all invoices.
    COUNT(id)::INT as "TotatNumberOfAllInvoices",
    -- The total price of all invoices.
    SUM("totalPrice") as "TotalPriceOfAllInvoices",
    -- The total number of all items.
    SUM(
        json_array_length(
                JSON(items)
            )
    )::INT as "TotalNumberOfAllItems",
    -- The inovices price avg.
    AVG("totalPrice") as "avgOfAllInvoicesPrice",
    -- The total number of pills.
    SUM( ( 
        SELECT
            SUM( (item->>'numberOfItems')::INT )
        FROM LATERAL json_array_elements(JSON(items)) as item
    ) )::INT as "totalNumberOfAllItemsPills"
FROM invoices;