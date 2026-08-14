import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("Codemetry extension activated!");
}

export function deactivate() {
  console.log("Codemetry extension deactivated!");
}
