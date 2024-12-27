module.exports = {
	importOrder: [
		"<THIRD_PARTY_MODULES>",
		"^ag-(.*)$",
		"@ts/common/css/overrides.css",
		"^@mui/(?!icons-material).*$",
		"^@ts/(?!common/(components|currentCheckpoint|filterState|hooks|icons|lib/mocks|services)|entity-select|query-hooks|(.*)/testHelpers).*$",
		"^@ts/common/lib/mocks/(.*)$|^mocks/(.*)$",
		"^Atoms(.*)|^config(.*)|^i18n(.*)$",
		"^@ts/(common/hooks/(.*)|query-hooks)$|^hooks/(.*)$|^queries/(.*)$",
		"^@ts/entity-select(|/(.*))$",
		"^@ts/(common/(currentCheckpoint|filterState))$|^contexts/(.*)$",
		"^@ts/common/components/(.*)$|^components/(.*)$",
		"^@mui/icons-material(.*)$|^@ts/common/icons$",
		"^[./]",
		"^pages/(.*)$|^reports/(.*)$",
		"^constants/(.*)$",
		"^@ts/common/services/(.*)$|^services/(.*)$",
		"^@ts/(common|current-user)/testHelpers(.*)$|^testHelpers(.*)$",
	],
	importOrderCaseInsensitive: true,
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	plugins: ["@trivago/prettier-plugin-sort-imports"],
	printWidth: 120,
	useTabs: true,
};