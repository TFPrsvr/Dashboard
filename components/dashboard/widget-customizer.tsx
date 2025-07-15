"use client";

import { useState } from "react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { Textarea } from "@/components/ui/Textarea";
import { WidgetPreview } from "./widget-preview";
import { CauseManager } from "./cause-manager";
import { WidgetConfig } from "@/types/widget.types";
import { Save, Eye } from "lucide-react";

const FONT_OPTIONS = [
  { value: "inter", label: "Inter" },
  { value: "roboto", label: "Roboto" },
  { value: "opensans", label: "Open Sans" },
  { value: "montserrat", label: "Montserrat" },
  { value: "lato", label: "Lato" },
  { value: "poppins", label: "Poppins" },
];

const PRESET_THEMES = [
  { name: "Ocean Blue", primary: "#0066cc", secondary: "#e6f2ff" },
  { name: "Forest Green", primary: "#228b22", secondary: "#e6f5e6" },
  { name: "Sunset Orange", primary: "#ff6347", secondary: "#ffe6e1" },
  { name: "Royal Purple", primary: "#6a0dad", secondary: "#f0e6ff" },
  { name: "Minimal Black", primary: "#000000", secondary: "#f5f5f5" },
];

interface WidgetCustomizerProps {
  initialConfig?: WidgetConfig;
  widgetId?: string;
  organizationName?: string;
  onSave: (config: WidgetConfig) => Promise<void>;
}

export function WidgetCustomizer({
  initialConfig,
  widgetId,
  organizationName,
  onSave,
}: WidgetCustomizerProps) {
  const getDefaultConfig = (): WidgetConfig => ({
    theme: {
      primaryColor: "#0066cc",
      secondaryColor: "#e6f2ff",
      fontFamily: "inter",
      borderRadius: "8px",
      customCss: "",
    },
    causes: [],
    settings: {
      showProgressBar: true,
      showDonorList: false,
      allowRecurring: true,
      minimumDonation: 5,
      suggestedAmounts: [10, 25, 50, 100],
    },
  });

  const [config, setConfig] = useState<WidgetConfig>(() => {
    if (!initialConfig || !initialConfig.theme) {
      return getDefaultConfig();
    }
    return {
      theme: {
        ...getDefaultConfig().theme,
        ...initialConfig.theme,
      },
      causes: initialConfig.causes || [],
      settings: {
        ...getDefaultConfig().settings,
        ...initialConfig.settings,
      },
    };
  });
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "desktop"
  );

  const updateTheme = (key: keyof typeof config.theme, value: string) => {
    setConfig((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        [key]: value,
      },
    }));
  };

  const updateSettings = (key: keyof typeof config.settings, value: any) => {
    setConfig((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(config);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Customization Panel */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Widget Customization</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="theme" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="theme">Theme</TabsTrigger>
                <TabsTrigger value="causes">Causes</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="theme" className="space-y-4">
                {/* Preset Themes */}
                <div>
                  <Label className="mb-2">Preset Themes</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {PRESET_THEMES.map((theme) => (
                      <button
                        key={theme.name}
                        onClick={() => {
                          updateTheme("primaryColor", theme.primary);
                          updateTheme("secondaryColor", theme.secondary);
                        }}
                        className="p-3 border rounded-lg hover:border-gray-400 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: theme.primary }}
                          />
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: theme.secondary }}
                          />
                        </div>
                        <p className="text-xs">{theme.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Pickers */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="primary-color"
                        type="color"
                        value={config.theme.primaryColor}
                        onChange={(e) =>
                          updateTheme("primaryColor", e.target.value)
                        }
                        className="w-20 h-10"
                      />
                      <Input
                        type="text"
                        value={config.theme.primaryColor}
                        onChange={(e) =>
                          updateTheme("primaryColor", e.target.value)
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="secondary-color"
                        type="color"
                        value={config.theme.secondaryColor}
                        onChange={(e) =>
                          updateTheme("secondaryColor", e.target.value)
                        }
                        className="w-20 h-10"
                      />
                      <Input
                        type="text"
                        value={config.theme.secondaryColor}
                        onChange={(e) =>
                          updateTheme("secondaryColor", e.target.value)
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Font Selection */}
                <div>
                  <Label htmlFor="font-family">Font Family</Label>
                  <Select
                    value={config.theme.fontFamily}
                    onValueChange={(value) => updateTheme("fontFamily", value)}
                  >
                    <SelectTrigger id="font-family">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_OPTIONS.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Border Radius */}
                <div>
                  <Label htmlFor="border-radius">Border Radius</Label>
                  <Select
                    value={config.theme.borderRadius}
                    onValueChange={(value) =>
                      updateTheme("borderRadius", value)
                    }
                  >
                    <SelectTrigger id="border-radius">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0px">None</SelectItem>
                      <SelectItem value="4px">Small</SelectItem>
                      <SelectItem value="8px">Medium</SelectItem>
                      <SelectItem value="12px">Large</SelectItem>
                      <SelectItem value="16px">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Custom CSS */}
                <div>
                  <Label htmlFor="custom-css">Custom CSS (Advanced)</Label>
                  <Textarea
                    id="custom-css"
                    value={config.theme.customCss}
                    onChange={(e) => updateTheme("customCss", e.target.value)}
                    placeholder=".widget-container { /* your styles */ }"
                    className="font-mono text-sm"
                    rows={4}
                  />
                </div>
              </TabsContent>

              <TabsContent value="causes">
                <CauseManager
                  causes={config.causes}
                  onChange={(causes) =>
                    setConfig((prev) => ({ ...prev, causes }))
                  }
                />
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-progress">Show Progress Bar</Label>
                  <Switch
                    id="show-progress"
                    checked={config.settings.showProgressBar}
                    onCheckedChange={(checked) =>
                      updateSettings("showProgressBar", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="show-donors">Show Recent Donors</Label>
                  <Switch
                    id="show-donors"
                    checked={config.settings.showDonorList}
                    onCheckedChange={(checked) =>
                      updateSettings("showDonorList", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="allow-recurring">
                    Allow Recurring Donations
                  </Label>
                  <Switch
                    id="allow-recurring"
                    checked={config.settings.allowRecurring}
                    onCheckedChange={(checked) =>
                      updateSettings("allowRecurring", checked)
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="min-donation">
                    Minimum Donation Amount ($)
                  </Label>
                  <Input
                    id="min-donation"
                    type="number"
                    min="1"
                    value={config.settings.minimumDonation}
                    onChange={(e) =>
                      updateSettings("minimumDonation", Number(e.target.value))
                    }
                  />
                </div>

                <div>
                  <Label>Suggested Donation Amounts ($)</Label>
                  <div className="grid grid-cols-4 gap-2 mt-1">
                    {config.settings.suggestedAmounts.map((amount, index) => (
                      <Input
                        key={index}
                        type="number"
                        min="1"
                        value={amount}
                        onChange={(e) => {
                          const newAmounts = [
                            ...config.settings.suggestedAmounts,
                          ];
                          newAmounts[index] = Number(e.target.value);
                          updateSettings("suggestedAmounts", newAmounts);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={saving} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Live Preview</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={previewMode === "desktop" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewMode("desktop")}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Desktop
                </Button>
                <Button
                  variant={previewMode === "mobile" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewMode("mobile")}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Mobile
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <WidgetPreview config={config} mode={previewMode} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
