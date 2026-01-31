// @ts-nocheck
import { config } from '@/lib/config';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, ChevronRight } from "lucide-react";
import { AdSpot } from "./AdSpot";
import { useTranslation } from "@/lib/i18n";

export const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const navCategories = [
    { to: "/", label: t("nav.home") },
    { to: "/artigos?category=markets", label: "Markets" },
    { to: "/artigos?category=investments", label: "Investments" },
    { to: "/artigos?category=economy", label: "Economy" },
    { to: "/artigos?category=business", label: "Business" },
    { to: "/ferramentas", label: t("nav.tools") },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm">
      {/* ========== AD ZONE: HEADER ========== */}
      <div className="border-b border-border">
        <div className="container py-3">
          <AdSpot position="header" zoneId={config.reviveZoneHeader} className="w-full rounded" />
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-border bg-card">
        <div className="container">
          <div className="flex h-14 items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2"
              data-bvx-track="LOGO_CLICK"
            >
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">$</span>
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                {"Intern Action Functions"}
              </span>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("common.search") + "..."}
                  className="w-full px-4 py-2 pr-10 text-sm bg-muted border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  data-bvx-track="SEARCH_INPUT"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary"
                  data-bvx-track="SEARCH_SUBMIT"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-muted-foreground hover:text-foreground"
                data-bvx-track="SEARCH_MOBILE_TOGGLE"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-muted-foreground hover:text-foreground"
                data-bvx-track="MOBILE_MENU_TOGGLE"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            {/* Desktop CTA */}
            <Link
              to="/sobre"
              className="hidden md:flex items-center gap-1 im-btn-primary"
              data-bvx-track="CTA_HEADER"
            >
              {t("common.subscribe")}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden md:block border-b border-border bg-card">
        <div className="container">
          <div className="flex items-center gap-1">
            {navCategories.map((cat) => (
              <Link
                key={cat.to}
                to={cat.to}
                className="im-nav-link"
                data-bvx-track={`NAV_${cat.label.toUpperCase()}`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="md:hidden border-b border-border bg-card p-3 animate-fade-in">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("common.search") + "..."}
              className="w-full px-4 py-2 pr-10 text-sm bg-muted border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
              autoFocus
              data-bvx-track="SEARCH_MOBILE_INPUT"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1">
              <Search className="h-4 w-4 text-muted-foreground" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden border-b border-border bg-card animate-fade-in">
          <div className="container py-3">
            <div className="flex flex-col">
              {navCategories.map((cat) => (
                <Link
                  key={cat.to}
                  to={cat.to}
                  className="py-2 px-3 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded"
                  onClick={() => setIsMenuOpen(false)}
                  data-bvx-track={`NAV_MOBILE_${cat.label.toUpperCase()}`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};
