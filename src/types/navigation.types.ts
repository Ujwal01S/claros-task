interface ISubNavigation {
  title: string;
  url: string;
}

export interface INavigationProps {
  title: string;
  url: string;
  icon: React.ElementType;
  subNavigation?: ISubNavigation[];
}
