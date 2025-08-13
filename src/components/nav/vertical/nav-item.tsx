import Icon from "@/components/icon/icon";
import useLocale from "@/locales/use-locale";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";
import { cn } from "@/utils";
import { NavItemRenderer } from "../components";
import { navItemClasses, navItemStyles } from "../styles";
import type { NavItemProps } from "../types";

export function NavItem(item: NavItemProps) {
	const { title, icon, info, caption, open, active, disabled, depth, hasChild } = item;
	const { t } = useLocale();

	const content = (
		<div className="group w-full flex items-center  justify-between">
			{/* Texts */}
			<span style={navItemStyles.texts} className="min-h-[24px]">
				{/* Title */}
				<span style={navItemStyles.title}>{t(title)}</span>

				{/* Caption */}
				{caption && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span style={navItemStyles.caption}>{t(caption)}</span>
							</TooltipTrigger>
							<TooltipContent side="top" align="start">
								{t(caption)}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</span>
			{/* Info */}
			{info && <span style={navItemStyles.info}>{info}</span>}
			{/* Icon */}{" "}
			<span style={navItemStyles.icon} className="mr-3 items-center justify-center  ">
				{icon && typeof icon === "string" ? <Icon icon={icon} className="[&>*]:fill-action-active" /> : icon}
			</span>
			{/* Arrow */}
			{hasChild && (
				<Icon
					icon="eva:arrow-ios-forward-fill"
					style={{
						...navItemStyles.arrow,
						// transform: open ? "rotate(90deg)" : "rotate(0deg)",
					}}
					className={cn(
						"[&>*]:fill-action-active",
						{
							"rotate-90": open,
							"rotate-180": !open,
						},
						open
							? "[&>*]:fill-primary "
							: " [&>*]:fill-primary-darker/50 group-hover:[&>*]:fill-primary dark:[&>*]:fill-primary-darker/50 dark:group-hover:[&>*]:fill-primary",
					)}
				/>
			)}{" "}
		</div>
	);

	const itemClassName = cn(
		navItemClasses.base,
		navItemClasses.hover,
		"min-h-[44px]",
		active && depth === 1 && navItemClasses.active,
		active && depth !== 1 && "bg-action-hover!",
		disabled && navItemClasses.disabled,
		open && navItemClasses.open,
	);

	return (
		<NavItemRenderer item={item} className={itemClassName}>
			{content}
		</NavItemRenderer>
	);
}
