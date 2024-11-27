# Multi-model-Ensemble-for-global-rainfall-reosivity-assessments
The rising trend of extreme rainfall events emphasizes the need for global rainfall erosivity assessments. 
We conducted a systematic screening and filtered 160+ models and then integrated them to an ensemble for global rainfall erosivity assessments. 
Here, the calculation of the multi-model ensemble on the Google Earth Engine platform (GEE) are documented.

# Usages
Several files are contained in the workflow: 
1. 
The functions of producing climatic parameters are GPCC_MO and GPCC_DA. The climatic parameters are used for rainfall erosivity calculation.

2.
The functions of producing rainfall erosivity layer stacks are separately as several files: GPCC_Compiled_Erosivity_Global (1); GPCC_Compiled_Erosivity_Global (2); GPCC_Compiled_Erosivity_Global (3); GPCC_Compiled_Erosivity_Global (4); GPCC_Compiled_Erosivity_Global (5); GPCC_Compiled_Erosivity_Global (6).

3.
The functions of running the functions of producing rainfall erosivity layer stacks are: Rainfall_erosivity_function_Export.

4.
The functions of the model ensemble are: Model_ensemble
