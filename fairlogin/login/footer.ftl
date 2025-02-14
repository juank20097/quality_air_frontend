<footer class="footer">
    <div class="container">
        <#if realm.internationalizationEnabled>
            <div id="language-picker" class="row justify-content-center">
                <div class="form-inline">
                    <div class="form-group">
                        <select id="language-picker-dropdown" class="form-control form-control-sm">
                            <option>${locale.current}</option>
                            <#list locale.supported as l>
                                <option value="${l.url}">${l.label}</option>
                            </#list>
                        </select>
                    </div>
                </div>
            </div>
        </#if>
        <div class="row justify-content-center">
            <a href="${msg("imprintLink")}" class="text-muted">${msg("imprintText")}</a>
            |
            <a href="${msg("termsOfServiceLink")}" class="text-muted">${msg("termsOfServiceText")}</a>
            |
            <a href="${msg("cloudTermsLink")}" class="text-muted">${msg("cloudTermsText")}</a>
            |
            <a href="${msg("fairloginOnboardingLink")}" class="text-muted">${msg("fairloginOnboardingText")}</a>
            |
            <a href="${msg("fairloginFaqsLink")}" class="text-muted">${msg("fairloginFaqsText")}</a>
        </div>
    </div>
</footer>