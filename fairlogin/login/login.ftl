<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=social.displayInfo; section>
<#if section = "form">
  <section>
    <div class="container h-100">
        <div class="row justify-content-md-center h-100">
            <div class="card-wrapper">
                <div class="text-center margin-bottom-30 margin-top-80">
                    <img src="${url.resourcesPath}/img/fairlogin.svg">
                </div>
                <div class="card">
                    
                        <ul class="nav nav-pills nav-fill" id="loginRegisterTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="login-tab" data-toggle="tab" href="#login" role="tab" aria-controls="login" aria-selected="true">${msg("loginTitleShort")}</a>
                            </li>
                            <#if realm.registrationAllowed>
                            <li class="nav-item">
                                <a class="nav-link" id="register-tab" href="${url.registrationUrl}" aria-controls="register" aria-selected="false">${msg("getFairloginId")}</a>
                            </li>
                            </#if>
                        </ul>
                 
                    <div class="card-body fat">
                        <#include "alert.ftl">
                            <div class="tab-content" id="loginTabContent">
                                <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                                    <form action="${url.loginAction}" method="post">

                                        <div class="form-group">
                                            <label for="username">${msg("usernameOrEmail")}</label>

                                            <input id="username" type="text" class="form-control" name="username" value="" required autofocus tabindex="1">
                                        </div>

                                        <div class="form-group">
                                            <label for="password">${msg("password")}
                                                <#if realm.resetPasswordAllowed>
                                                    <a href="${url.loginResetCredentialsUrl}" class="float-right" tabindex="5">
                                                        ${msg("doForgotPassword")}
                                                    </a>
                                                </#if>
                                            </label>
                                            <input id="password" type="password" class="form-control" name="password" required tabindex="2">
                                        </div>

                                        <#if realm.rememberMe && !usernameEditDisabled??>
                                            <div class="form-group">
                                                <label>
                                                    <input type="checkbox" name="rememberMe">&nbsp;&nbsp;${msg("rememberMe")}
                                                </label>
                                            </div>
                                        </#if>

                                        <div class="form-group no-margin">
                                            <button type="submit" class="btn btn-primary btn-block btn-main-action" name="login" tabindex="3">
                                                ${msg("doLogIn")}
                                            </button>
                                        </div>

                                    </form>

                                    <#if realm.password && social.providers??>
                                        <hr class="separator" />
                                        <p>${msg("getFairloginIdIdpDescription")}</p>
                                        
                                        <div class="text-center">
                                            <a class="btn btn-primary" data-toggle="collapse" href="#socialProviders" role="button" aria-expanded="false" aria-controls="social.providers" tabindex="4">
                                                ${msg("moreSocialIdentityProviders")}
                                            </a>
                                        </div>
                                        <div class="collapse" id="socialProviders">
                                        <div class="social-provider margin-top-20">
                                            <#list social.providers as p>
                                                <a href="${p.loginUrl}" id="zocial-${p.alias}" class="btn btn-block btn-social btn-${p.providerId}" style="margin-bottom: 5px">
                                                    <i class="fa fa-${p.providerId}"></i> Sign in with ${p.displayName}
                                                </a>
                                            </#list>
                                        </div>
                                        </div>
                                    </#if>
                                </div>
                            </div>
                    </div>
                </div>
               
            </div>
        </div>
        </div>
    </div>
</section>
</#if>
</@layout.registrationLayout>
