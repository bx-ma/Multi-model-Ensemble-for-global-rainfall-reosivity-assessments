# Multi-model-Ensemble-for-global-rainfall-reosivity-assessments
The rising trend of extreme rainfall events emphasizes the need for global rainfall erosivity assessments. 
We conducted a systematic screening and filtered 160+ models and then integrated them to an ensemble for global rainfall erosivity assessments. 
Here, the calculation of the multi-model ensemble on the Google Earth Engine platform (GEE) are documented.

# Usages
Several files are contained in the workflow: 

1. 
The functions of producing climatic parameters are GPCC_MO and GPCC_DA. The climatic parameters are used for rainfall erosivity calculation. Resave the GPCC_MO and GPCC_DA as Scripts on GEE, then users can use them like "var Fun_EQ_GPCC_MO = require('users/your GEE project name/your GEE Script name (like "functions:GPCC_Compiled_Erosivity_Global").your function name().your parameter();". The usage of GPCC_MO and GPCC_DA have been used in the functions of producing rainfall erosivity layer stacks (step 2, 3, and 4).

2.
The functions of producing rainfall erosivity layer stacks are separately as several files: GPCC_Compiled_Erosivity_Global (1); GPCC_Compiled_Erosivity_Global (2); GPCC_Compiled_Erosivity_Global (3); GPCC_Compiled_Erosivity_Global (4); GPCC_Compiled_Erosivity_Global (5); GPCC_Compiled_Erosivity_Global (6); GPCC_Compiled_Erosivity_Global (7).
GPCC_Compiled_Erosivity_Global (1-5) contain the calculation functions and applicable region boundaries of each model.
GPCC_Compiled_Erosivity_Global (6) contains the calculation functions and applicable region boundaries which can be replaced by models that were developed in the same Koppen-Geiger climate zones, with checking the CC and PBIAS between modeled results and the in-situ GloREDa v1.2 (Panagos et al., 2023).
GPCC_Compiled_Erosivity_Global (7) contains the calculation functions and applicable region boundaries of five past-used models in global rainfall erosivity assessments (Renard and Freimund, 1994; Naipal et al., 2015; Liu et al., 2020; Li et al., 2023).
These function have been uused in the main codes of running the functions of producing rainfall erosivity layer stacks and the codes of the model ensemble.

4.
The main codes of running the functions of producing rainfall erosivity layer stacks are: Rainfall_erosivity_function_Export.
This function could be run to produce rainfall erosivity images to GEE ASSET or CloudStorage.

5.
The codes of the model ensemble are: Model_ensemble and Model_ensemble_annual
Model_ensemble: this function call the rainfall erosivity images in GEE ASSET and produce an ImageCollection, then an average of the ImageCollection is reduced to map global rainfall erosivity.
Model_ensemble_annual: this function call the rainfall erosivity images in GEE ASSET and use an for loop to reduce the ImageCollection of annual global rainfall erosivity.

7.
Note: the functions and codes should be saved as GEE scripts brfore running.

Refenrences: 
Panagos, P., Hengl, T., Wheeler, I., Marcinkowski, P., Rukeza, M. B., Yu, B., Yang, J. E., Miao, C., Chattopadhyay, N., Sadeghi, S. H., Levi, Y., Erpul, G., Birkel, C., Hoyos, N., Oliveira, P. T. S., Bonilla, C.     A., Nel, W., Al Dashti, H., Bezak, N., Van Oost, K., Petan, S., Fenta, A. A., Haregeweyn, N., Perez-Bidegain, M., Liakos, L., Ballabio, C., Borrelli, P., 2023. Global rainfall erosivity database (GloREDa) and     monthly R-factor data at 1 km spatial resolution. Data Brief. 50, 109482. 10.1016/j.dib.2023.109482.
Li, J., He, H., Zeng, Q., Chen, L., Sun, R., 2023. A Chinese soil conservation dataset preventing soil water erosion from 1992 to 2019. Sci Data. 10, 319. 10.1038/s41597-023-02246-4.
Liu, Y., Zhao, W., Liu, Y., Pereira, P., 2020. Global rainfall erosivity changes between 1980 and 2017 based on an erosivity model using daily precipitation data. Catena. 194, 104768. 10.1016/j.catena.2020.104768.
Naipal, V., Reick, C., Pongratz, J., Van Oost, K., 2015. Improving the global applicability of the RUSLE model - adjustment of the topographical and rainfall erosivity factors. Geoscientific Model Development. 8,     2893-2913. 10.5194/gmd-8-2893-2015.
Renard, K. G., Freimund, J. R., 1994. Using monthly precipitation data to estimate the R-factor in the revised USLE. Journal of Hydrology. 157, 287-306. 10.1016/0022-1694(94)90110-4.
