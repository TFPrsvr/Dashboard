import { WidgetConfig } from "@/types/widget.types";
import { Heart, TrendingUp } from "lucide-react";

interface WidgetPreviewProps {
  config: WidgetConfig;
  mode: "desktop" | "mobile";
}

export function WidgetPreview({ config, mode }: WidgetPreviewProps) {
  const { theme, causes, settings } = config;
  const activeCauses = causes.filter((c) => c.isActive);

  return (
    <div
      className={`bg-gray-100 p-4 rounded-lg ${
        mode === "mobile" ? "max-w-sm mx-auto" : ""
      }`}
    >
      <div
        className="bg-white p-6 shadow-lg"
        style={{
          borderRadius: theme.borderRadius,
          fontFamily: theme.fontFamily,
        }}
      >
        <style>{theme.customCss}</style>

        <div className="widget-container">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: theme.primaryColor }}
          >
            Make a Difference Today
          </h2>

          {activeCauses.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Choose a Cause</h3>
              <div className="space-y-3">
                {activeCauses.map((cause) => (
                  <div
                    key={cause.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    style={{
                      borderColor: theme.secondaryColor,
                      backgroundColor: theme.secondaryColor + "20",
                    }}
                  >
                    <h4 className="font-semibold">{cause.name}</h4>
                    {cause.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {cause.description}
                      </p>
                    )}
                    {settings.showProgressBar && cause.goalAmount && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>${cause.raisedAmount.toLocaleString()}</span>
                          <span>${cause.goalAmount.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{
                              width: `${Math.min(
                                (cause.raisedAmount / cause.goalAmount) * 100,
                                100
                              )}%`,
                              backgroundColor: theme.primaryColor,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Select Amount</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {settings.suggestedAmounts.map((amount) => (
                <button
                  key={amount}
                  className="py-3 px-4 border-2 rounded-lg font-semibold transition-colors"
                  style={{
                    borderColor: theme.primaryColor,
                    color: theme.primaryColor,
                  }}
                >
                  ${amount}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Other amount"
              className="w-full p-3 border rounded-lg"
              style={{ borderRadius: theme.borderRadius }}
            />
          </div>

          {settings.allowRecurring && (
            <div className="mb-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Make this a monthly donation</span>
              </label>
            </div>
          )}

          <button
            className="w-full py-3 px-6 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
            style={{
              backgroundColor: theme.primaryColor,
              borderRadius: theme.borderRadius,
            }}
          >
            <Heart className="w-5 h-5" />
            Donate Now
          </button>

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
