import { WidgetConfig } from "@/types/widget.types";
import { Heart, TrendingUp, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";

interface WidgetPreviewProps {
  config: WidgetConfig;
  mode: "desktop" | "mobile";
}

export function WidgetPreview({ config, mode }: WidgetPreviewProps) {
  const { theme, causes, settings } = config;
  const activeCauses = causes.filter((c) => c.is_active);
  const [showColorGuide, setShowColorGuide] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState<"one-time" | "monthly">(settings.defaultFrequency);

  // Update selected frequency when default frequency changes
  useEffect(() => {
    setSelectedFrequency(settings.defaultFrequency);
  }, [settings.defaultFrequency]);

  return (
    <div
      className={`bg-gray-100 p-4 rounded-lg ${
        mode === "mobile" ? "max-w-sm mx-auto" : ""
      }`}
    >
      {/* Color Guide Toggle */}
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowColorGuide(!showColorGuide)}
          className="flex items-center gap-2 text-sm px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded-md transition-colors"
        >
          {showColorGuide ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showColorGuide ? "Hide" : "Show"} Color Guide
        </button>
      </div>

      <div
        className="p-6 shadow-lg relative"
        style={{
          borderRadius: theme.borderRadius,
          fontFamily: theme.fontFamily,
          backgroundColor: theme.backgroundColor,
        }}
      >
        <style>{theme.customCss}</style>
        
        {/* Background Color Guide */}
        {showColorGuide && (
          <div className="absolute top-2 left-2 bg-green-300 text-xs px-2 py-1 rounded shadow-sm pointer-events-none">
            Background Color
          </div>
        )}

        <div className="widget-container">
          {/* Header */}
          <div className="relative">
            <h2 
              className={`text-2xl font-bold mb-6 text-${theme.headerAlignment}`} 
              style={{ color: theme.headerColor }}
            >
              {theme.headerText}
            </h2>
            {showColorGuide && (
              <div className="absolute -top-1 -right-1 bg-yellow-300 text-xs px-2 py-1 rounded shadow-sm pointer-events-none">
                Header Color
              </div>
            )}
          </div>

          {/* Frequency Toggle */}
          {settings.allowRecurring && (
            <>
              <div className="flex rounded-full bg-gray-100 mb-4 overflow-hidden">
                <button
                  onClick={() => setSelectedFrequency("one-time")}
                  className={`flex-1 py-2 text-center font-medium transition-colors cursor-pointer ${
                    selectedFrequency === "one-time"
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                  style={{
                    backgroundColor: selectedFrequency === "one-time" ? theme.primaryColor : "transparent"
                  }}
                >
                  One-time
                </button>
                <button
                  onClick={() => setSelectedFrequency("monthly")}
                  className={`flex-1 py-2 text-center font-medium transition-colors cursor-pointer ${
                    selectedFrequency === "monthly"
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                  style={{
                    backgroundColor: selectedFrequency === "monthly" ? theme.secondaryColor : "transparent"
                  }}
                >
                  Monthly
                </button>
              </div>
              {/* Monthly Recurring Notice - Secondary Color Usage */}
              {selectedFrequency === "monthly" && (
                <div className="relative">
                  <div 
                    className="text-sm border rounded-md p-3 mb-6"
                    style={{ 
                      color: theme.secondaryColor,
                      backgroundColor: theme.secondaryColor + "20",
                      borderColor: theme.secondaryColor + "60"
                    }}
                  >
                    This will be a <strong>monthly recurring charge</strong>. You can cancel at any time.
                  </div>
                  {showColorGuide && (
                    <div className="absolute -top-1 -right-1 bg-purple-300 text-xs px-2 py-1 rounded shadow-sm pointer-events-none">
                      Secondary Color
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* 3x2 Preset Grid matching actual widget */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {settings.suggestedAmounts.slice(0, 3).map((amount) => (
              <button
                key={amount}
                className="py-3 rounded-xl font-semibold transition-colors"
                style={{
                  backgroundColor: "#dbeafe", // bg-blue-200
                  color: "#1f2937", // text-gray-800
                  borderRadius: theme.borderRadius,
                }}
              >
                ${amount}
              </button>
            ))}
            {settings.suggestedAmounts.slice(3, 5).map((amount) => (
              <button
                key={amount}
                className="py-3 rounded-xl font-semibold transition-colors"
                style={{
                  backgroundColor: "#dbeafe", // bg-blue-200
                  color: "#1f2937", // text-gray-800
                  borderRadius: theme.borderRadius,
                }}
              >
                ${amount}
              </button>
            ))}
            <button
              className="py-3 rounded-xl font-semibold transition-colors"
              style={{
                backgroundColor: "#dbeafe", // bg-blue-200
                color: "#1f2937", // text-gray-800
                borderRadius: theme.borderRadius,
              }}
            >
              Other
            </button>
          </div>

          {/* Cause Dropdown matching actual widget */}
          {activeCauses.length > 0 && (
            <select
              className="w-full p-3 border border-gray-300 mb-6 focus:outline-none focus:ring-2"
              style={{
                borderRadius: theme.borderRadius
              }}
            >
              {activeCauses.map((cause) => (
                <option key={cause.id}>{cause.name}</option>
              ))}
            </select>
          )}

          {/* Cover Fee checkbox matching actual widget */}
          {settings.showCoverFees && (
            <label className="flex items-center space-x-2 mb-6">
              <input type="checkbox" className="cursor-pointer" />
              <span className="text-gray-700">Cover payment fees (3%)</span>
            </label>
          )}

          {/* Payment Buttons matching actual widget */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <button
                className="w-full py-3 rounded-xl font-semibold text-white transition-colors"
                style={{
                  backgroundColor: theme.primaryColor,
                  borderRadius: theme.borderRadius,
                }}
              >
                Pay with Card
              </button>
              {showColorGuide && (
                <div className="absolute -top-1 -right-1 bg-blue-300 text-xs px-2 py-1 rounded shadow-sm pointer-events-none">
                  Primary Color
                </div>
              )}
            </div>
            <div className="flex-1 relative">
              <button
                className="w-full py-3 rounded-xl font-semibold text-white transition-colors"
                style={{
                  backgroundColor: theme.secondaryColor,
                  borderRadius: theme.borderRadius,
                }}
              >
                Pay via Bank
              </button>
              {showColorGuide && (
                <div className="absolute -top-1 -right-1 bg-purple-300 text-xs px-2 py-1 rounded shadow-sm pointer-events-none">
                  Secondary Color
                </div>
              )}
            </div>
          </div>

          {settings.showDonorList && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-semibold mb-3 text-gray-600">
                Recent Donors
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Anonymous</span>
                  <span>$50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>John D.</span>
                  <span>$100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Sarah M.</span>
                  <span>$25</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
