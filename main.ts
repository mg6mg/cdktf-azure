import { Construct } from "constructs";
import { App, TerraformOutput, TerraformStack } from "cdktf";
import { provider, dataAzurermServicePlan, windowsWebApp } from "./.gen/providers/azurerm";

type EnvType = 'sample';

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string, env: EnvType) {
    super(scope, name);

    // Defining an Azure Provider
    new provider.AzurermProvider(this, "AzureRm", {
      features: {},
      subscriptionId: process.env.subscriptionId,
      tenantId: process.env.tenandId
    });

    // Defining an AppServicePlan
     const appPlan = new dataAzurermServicePlan.DataAzurermServicePlan(this, "AppServicePlan", {
      name: "your-appPlanName",
      resourceGroupName: "your-resourceGroup"
    });

    // Defining an AppService
    const ase = new windowsWebApp.WindowsWebApp(this, "AppService", {
      name: `${env}-ase-cdkdemo`,
      location: appPlan.location,
      resourceGroupName : appPlan.resourceGroupName,
      servicePlanId: appPlan.id,
      siteConfig: {
        alwaysOn: false,
        applicationStack: {
          dotnetVersion: "v6.0"
        }
      }
    });

    // Output AppService URL
    new TerraformOutput(this, "url", {
      value: ase.defaultHostname
    });
  }
}

const app = new App();
new MyStack(app, "cdktf-azure", "sample");
app.synth();
