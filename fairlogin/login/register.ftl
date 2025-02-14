<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
 <#if section="form">
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
                                <a class="nav-link" id="login-tab" href="${url.loginUrl}" aria-controls="login" aria-selected="false">${msg("loginTitleShort")}</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="true">${msg("getFairloginId")}</a>
                            </li>
                        </ul>
                    
                    <div class="card-body fat">
                        <#include "alert.ftl">
                            <div class="tab-content" id="registerTabContent">
                                <div class="tab-pane fade show active" id="register" role="tabpanel" aria-labelledby="register-tab">
                                    <form action="${url.registrationAction}" method="post" onsubmit="return checkAnswer()">

                                        <div class="form-group">
                                            <label for="firstName">${msg("firstName")}</label>
                                            <input id="firstName" type="text" class="form-control" name="firstName" autofocus>
                                        </div>

                                        <div class="form-group">
                                            <label for="lastName">${msg("lastName")}</label>
                                            <input id="lastName" type="text" class="form-control" name="lastName">
                                        </div>

                                        <div class="form-group">
                                            <label for="username">${msg("username")}</label>
                                            <input id="username" type="text" class="form-control" name="username" required>
                                        </div>


                                        <div class="form-group">
                                            <label for="email" class="required">${msg("email")}</label>
                                            <input id="email" type="email" class="form-control" name="email" required>
                                        </div>

                                        <div class="form-group">
                                            <label for="password" class="required">${msg("password")}</label>
                                            <input id="password" type="password" class="form-control" name="password" required>
                                            <div class="invalid-feedback">${msg("errorNotValidPassword")}</div>
                                        </div>

                                        <div class="form-group">
                                            <label for="password-confirm" class="required">${msg("passwordConfirm")}</label>
                                            <input id="password-confirm" type="password" class="form-control" name="password-confirm" required>
                                            <div class="invalid-feedback">${msg("errorNotSamePassword")}</div>
                                        </div>

                                        <div class="form-group text-center margin-top-40">
                                            <label>
                                                <input id="agreeTerms" type="checkbox" name="user.attributes.agreeTerms"> ${msg("privacyPolicyText")?no_esc}
                                            </label>
                                        </div>

                                        <div class="form-group no-margin">
                                            <button id="registerBtn" type="submit" class="btn btn-primary btn-block btn-main-action" disabled>
                                                ${msg("doRegister")}
                                            </button>
                                        </div>
                                        <div class="margin-top20 text-center">
                                            ${msg("registerAlreadyAccountText")}
                                            <a href="${url.loginUrl}">${msg("doLogIn")}</a>
                                        </div>
                                    </form>
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