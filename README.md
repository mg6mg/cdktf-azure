# cdktf-azure

Use CDKTF to create a new AppService on an existing AppServicePlan.

# Install

Install [CDK for Terraform](https://developer.hashicorp.com/terraform/tutorials/cdktf/cdktf-install) beforehand, then clone repo.

# Quick Start

Edit the code

```main.ts
// Defining an AppServicePlan
     const appPlan = new dataAzurermServicePlan.DataAzurermServicePlan(this, "AppServicePlan", {
      name: "your-appPlanName",
      resourceGroupName: "your-resourceGroup"
    });
```

Run on the Powershell console.

```powershell
#  Az login is used for authentication.
$subscriptionId = "your-subscritption"
$tenantId = "your-tenantId"

az login --tenant $tenantId
az account set --subscription $subscriptionId
az account show

# Get Module
cdktf get

# Chk
cdktf diff

# Deploy
cdktf deploy
```
