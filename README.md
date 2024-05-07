# fCC-D3-Heat-Map

### Objective

Visualize the provided Monthly Global Land-Surface Temperature data using the D3 svg-based visualization library.

### User Stories / Test Cases

1. My heat map should have a title with a corresponding id="title".

2. My heat map should have a description with a corresponding id="description".

3. My heat map should have an x-axis with a corresponding id="x-axis".

4. My heat map should have a y-axis with a corresponding id="y-axis".

5. My heat map should have rect elements with a class="cell" that represent the data.

6. There should be at least 4 different fill colors used for the cells.

7. Each cell will have the properties data-month, data-year, data-temp containing their corresponding month, year, and temperature values.

8. The data-month, data-year of each cell should be within the range of the data.

9. My heat map should have cells that align with the corresponding month on the y-axis.

10. My heat map should have cells that align with the corresponding year on the x-axis.

11. My heat map should have multiple tick labels on the y-axis with the full month name.

12. My heat map should have multiple tick labels on the x-axis with the years between 1754 and 2015.

13. My heat map should have a legend with a corresponding id="legend".

14. My legend should contain rect elements.

15. The rect elements in the legend should use at least 4 different fill colors.

16. I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.

17. My tooltip should have a data-year property that corresponds to the data-year of the active area.