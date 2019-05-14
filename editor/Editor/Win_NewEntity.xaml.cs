using System;
using System.Collections.Generic;
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
using System.Windows.Shapes;

namespace Editor
{
	/// <summary>
	/// Interaktionslogik für Win_NewEntity.xaml
	/// </summary>
	public partial class Win_NewEntity:Window
	{
		public Entity_Item return_Entity { set; get; }

		public Win_NewEntity()
		{
			WindowStartupLocation=System.Windows.WindowStartupLocation.CenterScreen;
			InitializeComponent();
		}

		public void Button_Create_Click(object sender, RoutedEventArgs e)
		{
			return_Entity=new Entity_Item(txtbxEntityName.Text);
			this.Close();
		}
	}
}
