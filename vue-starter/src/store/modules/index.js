const getExportValues = (requireContextValue)  => requireContextValue.default || requireContextValue;
const getModuleName = (filePath) => filePath
	.replace(/^\.\//, '') // 파일 경로 앞단의 ./ 제거
	.replace(/\.js$/, '') // .js 제거

const requireContext = require.context(
	'./', // 탐색할 root 폴더
	true, // 하위 폴더까지 탐색
	/^(?!.*index\.js$).*\.js$/ // 탐색할 정규 표현식 (index를 제외한 js 파일들을 탐색합니다)
);

const modules = {};
requireContext.keys().forEach(filePath => {
    const exportValues = getExportValues(requireContext(filePath));
    const moduleName = getModuleName(filePath);
    modules[moduleName] = {
        namespaced: true,
        ...exportValues,
    }
})

export default modules;