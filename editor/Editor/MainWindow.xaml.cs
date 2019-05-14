using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Editor
{
	/// <summary>
	/// Interaktionslogik für MainWindow.xaml
	/// </summary>
	public partial class MainWindow:Window
	{
		public MainWindow()
		{
			WindowStartupLocation=System.Windows.WindowStartupLocation.CenterScreen;
			InitializeComponent();
		}

		void ResizeCanvas(int width, int height)
		{
			Canvas.Width=width;
			Canvas.Height=height;
		}

		private void Button_NewEntity_Click(object sender, RoutedEventArgs e)
		{
			Win_NewEntity win = new Win_NewEntity();
			win.ShowDialog();
			if(win.return_Entity != null)
				ListView_Entities.Items.Add(win.return_Entity);
		}

		private void Button_NewScene_Click(object sender, RoutedEventArgs e)
		{
			Win_NewScene win = new Win_NewScene();
			win.ShowDialog();
			if (win.return_Scene!=null)
				ListView_Scenes.Items.Add(win.return_Scene);
		}

		private void Button_Settings_Click(object sender, RoutedEventArgs e)
		{
			Win_Settings win = new Win_Settings();
			win.ShowDialog();
			ResizeCanvas(Settings.AppWidth, Settings.AppHeight);
		}

		private void ListView_Entities_MouseDoubleClick(object sender, MouseButtonEventArgs e)
		{
			var item = (sender as ListView).SelectedItem;
			if (item!=null)
			{
				Entity_Item eItem = (Entity_Item)item;
				MessageBox.Show(eItem.Name);
			}
		}
	}
}
