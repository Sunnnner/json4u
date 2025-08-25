"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Href } from "@/components/LinkButton";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ReferProps {
  disableHeading?: boolean;
}

export default function Refer({ disableHeading }: ReferProps) {
  const t = useTranslations();
  const currentPath = usePathname();

  // 使用中文版本的项目列表
  const items = [
    { title: "如何进行 JSON 格式化？", href: "/tutorial/format" },
    { title: "如何进行 JSON 压缩/最小化？", href: "/tutorial/minify" },
    { title: "如何进行 JSON 转义与去除转义？", href: "/tutorial/escape" },
    { title: "如何按 key 的字典序对 JSON 进行排序？", href: "/tutorial/sort" },
    { title: "如何将 Python dict 转换为 JSON？", href: "/tutorial/python-dict-to-json" },
    { title: "如何将 URL 转换为 JSON？", href: "/tutorial/url-to-json" },
    { title: "如何结构化/语义化比较 JSON？", href: "/tutorial/compare" },
    { title: "如何使用 JSON path？", href: "/tutorial/json-path" },
    { title: "如何使用 jq？", href: "/tutorial/jq" },
    { title: "如何导入或导出 CSV 文件？", href: "/tutorial/csv" },
  ];
  const otherItems = items.filter((item) => item.href !== currentPath);

  return (
    <div>
      <Typography variant="h2" className={cn("text-primary", disableHeading && "hidden")}>
        {t("related_features")}
      </Typography>
      <ul>
        {otherItems.map((item) => (
          <li key={item.title}>
            <Link href={item.href as Href}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
